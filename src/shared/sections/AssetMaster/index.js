import React from 'react';
import Helmet from 'react-helmet';
import { ConnectedComponent as SiteMain } from '../../components/SiteMain';
import { reactUtils } from '../../utils';
import scssVariables from '../../../variables.scss';

const { useBodyClass } = reactUtils;
const AssetMaster = () => {
  useBodyClass('page--store');

  return <>
    <Helmet>
      <title>Assets</title>
    </Helmet>
    <SiteMain className="main--asset-sheet">
      <h1 className="heading heading--main">Heading Style Main</h1>
      <h2 className="heading heading--sub-main">Heading Style Sub-Main</h2>
      <h3 className="heading heading--content">Heading Style Content</h3>
      <h4 className="heading heading--sub-content">Heading Style Sub-Content</h4>
      <h5 className="heading heading--sub-minor">Heading Style Sub-Minor</h5>
      <h6 className="heading heading--minor">Heading Style Minor</h6>

      <hr />

      <h3 className="heading heading--content">Normal Copy</h3>
      <p className="body-text">Phasellus non egestas diam, sit amet blandit orci.
        Suspendisse porttitor auctor eros vel sodales. Donec bibendum facilisis hendrerit.
        Sed ac odio cursus, lobortis dolor id, lacinia est. Donec rutrum, est vel
        commodo ultricies, ipsum mi iaculis sapien, id auctor magna tortor vehicula
        orci. Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Praesent auctor semper magna consectetur vestibulum.
      </p>

      <h3 className="heading heading--content">Normal Copy with bold text</h3>
      <p className="body-text">Proin viverra enim vel dui finibus elementum.
        <strong>Nulla convallis dui eu neque maximus tempus et sed nisl.</strong>
        Pellentesque et nisl dictum, rhoncus purus non, tempus purus. Nam gravida
        dui ac magna gravida, ac suscipit sapien porta. Duis malesuada nec quam
        eu aliquet. Morbi tristique finibus malesuada. Aliquam erat volutpat.
        Praesent semper arcu egestas, ultricies quam ut, convallis metus.
      </p>

      <h3 className="heading heading--content">Normal Copy with italic text</h3>
      <p className="body-text">Morbi id magna nec metus efficitur aliquet.
        <em>Vestibulum pellentesque tincidunt massa vel rhoncus.</em> Fusce sit
          amet ex eros. Fusce pulvinar blandit magna. Etiam non arcu nec augue
          vehicula suscipit id quis risus. Pellentesque bibendum eu magna in lacinia.
          Nullam eu consectetur lorem, nec venenatis dui.
      </p>

      <h3 className="heading heading--content">Normal Copy with hyperlink text</h3>
      <p className="body-text">Donec sollicitudin a arcu eget vehicula. Aliquam malesuada eu
        <a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer">velit tempus convallis</a>.
        Aenean nec interdum nunc. Nam non arcu porta magna commodo pulvinar.
        Praesent accumsan vulputate condimentum. Nunc bibendum massa libero, et
        facilisis ipsum aliquet quis. Praesent in orci non sapien suscipit iaculis.
        Suspendisse non facilisis mauris, eget facilisis ex. Sed viverra sagittis enim.
      </p>

      <hr />

      <h3 className="heading heading--content">Unordered List</h3>
      <ul>
        <li>Item #1</li>
        <li>Item #2</li>
        <li>Item #3</li>
        <li>Item #4</li>
      </ul>

      <h3 className="heading heading--content">Ordered List</h3>
      <ol>
        <li>Item #1</li>
        <li>Item #2</li>
        <li>Item #3</li>
        <li>Item #4</li>
      </ol>

      <h3 className="heading heading--content">'Clean' Unordered List</h3>
      <ul className="clean-list">
        <li>Item #1</li>
        <li>Item #2</li>
        <li>Item #3</li>
        <li>Item #4</li>
      </ul>

      <h3 className="heading heading--content">'Clean' Ordered List</h3>
      <ol className="clean-list">
        <li>Item #1</li>
        <li>Item #2</li>
        <li>Item #3</li>
        <li>Item #4</li>
      </ol>

      <h3 className="heading heading--content">With Body Text Class</h3>
      <ul className="body-text">
        <li>Item #1</li>
        <li>Item #2</li>
        <li>Item #3</li>
        <li>Item #4</li>
      </ul>

      <hr />

      <form>
        <p className="body-text">
          <label htmlFor="text-input">Text</label>
          <input className="form--text-input" id="text-input" type="text" defaultValue="Your Name" />
        </p>

        <p className="body-text">
          <label htmlFor="text-placeholder-input">Text with Placeholder</label>
          <input className="form--text-input" id="text-placeholder-input" type="text" placeholder="Your Name" />
        </p>

        <p className="body-text">
          <label htmlFor="password-input">Password</label>
          <input className="form--text-input form--password-input" id="password-input" type="password" defaultValue="testingpassword" />
        </p>

        <p className="body-text">
          <label htmlFor="select-list">Select Option List</label>
          <select className="form--select-list" id="select-list">
            <option>Default Value</option>
            <option value="testvalue1">Option #1</option>
            <option value="testvalue2">Option #2</option>
            <option value="testvalue3">Option #3</option>
          </select>
        </p>

        <p className="body-text">
          <label htmlFor="checkbox-input-1">Checkbox</label><br />
          <label htmlFor="checkbox-input-1">Item #1</label> <input name="checkbox-input[]" className="form--checkbox-input" id="checkbox-input-1" type="checkbox" /><br />
          <label htmlFor="checkbox-input-2">Item #2</label> <input name="checkbox-input[]" className="form--checkbox-input" id="checkbox-input-2" type="checkbox" /><br />
          <label htmlFor="checkbox-input-3">Item #3</label> <input name="checkbox-input[]" className="form--checkbox-input" id="checkbox-input-3" type="checkbox" />
        </p>

        <p className="body-text">
          <label htmlFor="radio-input-1">Radio Buttons</label><br />
          <label htmlFor="radio-input-1">Item #1</label> <input name="radio-input" className="form--radio-input" id="radio-input-1" type="radio" /><br />
          <label htmlFor="radio-input-2">Item #2</label> <input name="radio-input" className="form--radio-input" id="radio-input-2" type="radio" /><br />
          <label htmlFor="radio-input-3">Item #3</label> <input name="radio-input" className="form--radio-input" id="radio-input-3" type="radio" />
        </p>

        <p className="body-text">
          <button className="form--button">Button</button> <button className="form--button form--button-alt">Alt. Button</button>
        </p>
      </form>

      <hr />

      <h3 className="heading heading--content">Table</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Column #1</th>
            <th>Column #2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Noun #1</td>
            <td>Value A</td>
            <td>Value B</td>
          </tr>
          <tr>
            <td>Noun #2</td>
            <td>Value C</td>
            <td>Value D</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Results</td>
            <td>Result X</td>
            <td>Result Y</td>
          </tr>
        </tfoot>
      </table>

      <hr />

      <h3 className="heading heading--content">Palette</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Sample</th>
            <th>CSS Colour Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(scssVariables).map((key) => (<tr key={`row-${key}`}>
            <td>{key}</td>
            <td><div style={{ border: '1px solid #cccccc', width: '15px', height: '15px', backgroundColor: scssVariables[key] }} /></td>
            <td>{scssVariables[key]}</td>
          </tr>))}
        </tbody>
      </table>
    </SiteMain>
  </>;
};
AssetMaster.getInitialProps = ({ req, res, match, history, location, ...ctx }) => {
  return { ...ctx };
};

export default AssetMaster;
