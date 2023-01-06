import React from 'react';
import ComingSoon from './components/ComingSoon/ComingSoon';
import Layout from './components/Layout/Layout';
import Landing from './components/Landing/Landing';
import MLA8Form from './components/MLA8Form/MLA8Form';
import QuickCite from './components/QuickCite/QuickCite';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    pageLocation: state.pageLocation,

  };
}

const App = (props) => (
  <div style={{display:'flex'}}>
    <Layout>
      {(props.pageLocation === 'Home')? <Landing /> : null}
      {(props.pageLocation === 'MLA8')? <MLA8Form /> : null}
      {(props.pageLocation === 'MLA7')? <ComingSoon /> : null}
      {(props.pageLocation === 'APA')? <ComingSoon /> : null}
      {(props.pageLocation === 'Chicago')? <ComingSoon /> : null}
      {(props.pageLocation === 'QuickCite')? <QuickCite format="MLA8" source="" /> : null}
    </Layout>
  </div>
);

export default connect(mapStateToProps)(App);
