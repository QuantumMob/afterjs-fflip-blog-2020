import Zdog from 'zdog';
// Thanks & Source: https://codepen.io/caesura/pen/jONRjNb

class ZDogAtomIllustration {
  constructor(opts = {}) {
    const {
      nucleiPalette,
      distance,
      resize,
      scale,
      zoom,
      doDrawElectrons,
      doAnimateElectrons,
      doAnimate,
      dragRotate,
      pauseOnDrag,
      electronColor,
      dimScale
    } = opts;

    this.illustration = null;
    this.element = null;
    this.lines = null;
    this.nuclei = null;
    this.animateFrameId = null;

    this.scale = scale;
    this.resize = resize;
    this.zoom = zoom;

    this.status = 'init';
    this.dimScale = dimScale || 1;
    this.electronColor = electronColor || '#333333';
    this.distance = distance || 36;
    this.TAU = Zdog.TAU;
    this.doDrawElectrons = typeof doDrawElectrons === 'boolean' ? doDrawElectrons : false;
    this.doAnimate = typeof doAnimate === 'boolean' ? doAnimate : true;
    this.doAnimateElectrons = typeof doAnimateElectrons === 'boolean' ? doAnimateElectrons : true;
    this.pauseOnDrag = typeof pauseOnDrag === 'boolean' ? pauseOnDrag : false;
    this.dragRotate = typeof dragRotate === 'boolean' ? dragRotate : false;

    this.nucleiPalette = nucleiPalette instanceof Array && nucleiPalette.length === 3
      ? nucleiPalette
      : ['#de4f41', '#E62', 'orange'];
  }

  setup(element) {
    const { distance, TAU, resize, scale, zoom, pauseOnDrag, dragRotate, doDrawElectrons } = this;
    const originalAnimateOpt = this.doAnimate;
    this.element = typeof element === 'function' ? element() : element;
    const illOpts = {
      ...(typeof dragRotate !== 'undefined' ? { dragRotate } : {}),
      ...(typeof pauseOnDrag !== 'undefined'
        ? {
          onDragStart: () => { this.doAnimate = false; },
          onDragEnd: () => { this.doAnimate = originalAnimateOpt; }
        }
        : {}),
      ...(typeof scale !== 'undefined' ? { scale } : {}),
      ...(typeof resize !== 'undefined' ? { resize } : {}),
      ...(typeof zoom !== 'undefined' ? { zoom } : {}),
      element
    };

    this.illustration = new Zdog.Illustration(illOpts);

    this.nuclei = this.addNucleus([
      { x: distance },
      { x: -distance },
      { z: distance },
      { z: -distance }
    ]);
    this.lines = [];
    if (doDrawElectrons) {
      this.lines = this.addLines([
        { y: TAU / 3.25 },
        { x: TAU / 3.25 },
        { x: TAU / 3.1, y: TAU / 2.6 },
        { x: -TAU / 3.1, y: TAU / 2.6 }
      ]);
    }
    this.status = 'ready';

    return this;
  }

  start() {
    return new Promise((resolve) => {
      this.status = 'running';
      const doFrame = () => {
        if (this.status === 'stopped') {
          if (this.animateFrameId !== null) {
            cancelAnimationFrame(this.animateFrameId);
          }

          resolve();
          return;
        }

        this.draw();
        this.animateFrameId = requestAnimationFrame(doFrame);
      };

      doFrame();
    });
  }

  end() {
    this.status = 'stopped';

    return this;
  }

  addNucleus(points) {
    const { illustration, dimScale, distance, TAU } = this;
    const nuke = new Zdog.Anchor({ addTo: illustration });

    const dot = new Zdog.Shape({
      addTo: nuke,
      translate: { y: -distance },
      stroke: 55 * dimScale,
      color: this.nucleiPalette[0]
    });

    dot.copy({ translate: { y: distance } });

    points.forEach((translate, index) => {
      const color = 'x' in translate ? this.nucleiPalette[1] : this.nucleiPalette[2];
      // const color = 'x' in translate ? '#0000ff' : '#00ff00';
      dot.copy({ translate, color });
    });

    nuke.rotate.y = TAU / 1.5;
    nuke.rotate.z = TAU / 1.5;

    return nuke;
  }

  addLines(points) {
    const { illustration, dimScale, electronColor } = this;
    const lines = points.map(point => {
      const dotGroup = this.addGroup(new Zdog.Ellipse({
        addTo: illustration,
        width: 1000 * dimScale,
        height: 1000 * dimScale,
        stroke: 7 * dimScale,
        fill: false,
        color: this.nucleiPalette[0],
        rotate: point
      }));

      /* eslint-disable no-new */
      new Zdog.Shape({
        addTo: dotGroup,
        stroke: 20 * dimScale,
        color: electronColor,
        translate: { x: -500 * dimScale }
      });

      new Zdog.Shape({
        addTo: dotGroup,
        stroke: 20 * dimScale,
        color: electronColor,
        translate: { x: 500 * dimScale }
      });
      /* eslint-enable no-new */

      return dotGroup;
    });

    return lines;
  }

  addGroup(addTo) {
    return new Zdog.Group({ addTo });
  }

  animateFrame() {
    if (this.doAnimate) {
      this.nuclei.rotate.y += 0.05;
      this.nuclei.rotate.z += 0.05;
    }
    if (this.doAnimateElectrons) {
      // we want to maintain the references
      /* eslint-disable no-return-assign, no-param-reassign */
      this.lines.forEach(line => line.rotate.z += 0.05);
      /* eslint-enable no-return-assign, no-param-reassign */
    }
  }

  draw() {
    const { illustration } = this;

    this.animateFrame();
    illustration.updateRenderGraph();
  }
}

export default ZDogAtomIllustration;
