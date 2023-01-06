import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AuthorFieldGroup from '../AuthorFieldGroup/AuthorFieldGroup';
import * as actionTypes from '../../store/actions';
import Preview from '../Preview/Preview';
import { EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import ToolTipInput from '../widgets/ToolTipInput';
import Grid from '@material-ui/core/Grid';
import MLA8Citation from '../CitationRules/MLA/MLA8';

// styling
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1976d2',
    },
  },
  icon: {
    '&:hover': {
      color: '#333',
    },
  },
}));

// Redux form stuff
const mapStateToProps = state => {
  return {
    contributors: state.contribFields,
    srcTitle: state.srcTitle,
    conTitle: state.conTitle,
    version: state.version,
    number: state.number,
    publisher: state.publisher,
    date: state.date,
    location: state.location,
    editorState: state.previewContent,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addContributorHandler: () => dispatch({type: actionTypes.ADD_CONTRIBUTOR}),
    removeContributorHandler: (index) => dispatch({
      type: actionTypes.REMOVE_CONTRIBUTOR,
      index: index
    }),
    editContributorHandler: (index, name, event) => dispatch({
      type: actionTypes.EDIT_CONTRIBUTOR,
      index: index,
      name: name,
      event: event,
    }),
    editSourceTitleHandler: (newTitle) => dispatch({
      type: actionTypes.EDIT_SRCTITLE,
      title: newTitle
    }),
    editContainerTitleHandler: (newTitle) => dispatch({
      type: actionTypes.EDIT_CONTITLE,
      title: newTitle
    }),
    editVersionHandler: (newVersion) => dispatch({
      type: actionTypes.EDIT_VERSION,
      value: newVersion,
    }),
    editNumberHandler: (newNumber) => dispatch({
      type: actionTypes.EDIT_NUMBER,
      value: newNumber,
    }),
    editPublisherHandler: (newPublisher) => dispatch({
      type: actionTypes.EDIT_PUBLISHER,
      value: newPublisher,
    }),
    editDateHandler: (newDate) => dispatch({
      type: actionTypes.EDIT_DATE,
      value: newDate,
    }),
    editLocationHandler: (newLocation) => dispatch({
      type: actionTypes.EDIT_LOCATION,
      value: newLocation,
    }),
    editEditorStateHandler: (editorState) => dispatch({
      type: actionTypes.EDIT_PREVIEW_CONTENT,
      content: editorState,
    })
  };
}

let MLA8Form = (props) => {
  const classes = useStyles();

  let authors = [];
  for (let i = 0; i < props.contributors.length-1; i++) {
    authors.push(<AuthorFieldGroup
      plusButton={false}
      removeAuthor={() => {props.removeContributorHandler(i)}}
      valueObj={props.contributors[i]}
      handleChange={(name, event) => props.editContributorHandler(i, name, event)}
    />
    );
  }
  authors.push(<AuthorFieldGroup
    plusButton={true}
    addAuthor={props.addContributorHandler}
    valueObj={props.contributors[props.contributors.length-1]}
    handleChange={(name, event) => props.editContributorHandler(props.contributors.length-1, name, event)}
    />
  );

  return (
    <div>
      <form className={classes.container} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {authors}
          </Grid>
          <Grid item xs={12} sm={5}>
            <ToolTipInput
              label="Source Title"
              value={props.srcTitle}
              onChange={(e) => props.editSourceTitleHandler(e.target.value)}
              placeholder="Source Title"
            >
              What a source is called or its name. In the absence of a title, some styles may ask for a summary of the source.
            </ToolTipInput>
          </Grid>
          <Grid item xs={12} sm={5}>
            <ToolTipInput
              label="Container Title"
              value={props.conTitle}
              onChange={(e) => props.editContainerTitleHandler(e.target.value)}
              placeholder="Container Title"
            >
              Help?
            </ToolTipInput>
          </Grid>
          <Grid item xs={12} sm={5}>
            <ToolTipInput
              label="Version"
              value={props.version}
              onChange={(e) => props.editContainerVersionHandler(e.target.value)}
              placeholder="Version"
            >
              Help?
            </ToolTipInput>
          </Grid>
          <Grid item xs={12} sm={5}>
            <ToolTipInput
              label="Number"
              value={props.number}
              onChange={(e) => props.editNumberHandler(e.target.value)}
              placeholder="Number"
            >
              Name of the city, state or country where the publisher of a source is located. For written sources, this can usually be found on the title page. It is not always required, depending on the style.
            </ToolTipInput>
          </Grid>
          <Grid item xs={12} sm={5}>
            <ToolTipInput
              label="Publisher"
              value={props.publisher}
              onChange={(e) => props.editPublisherHandler(e.target.value)}
              placeholder="Publisher"
            >
              The organization, company, individual, or other entity that published, sponsored, or issued the content.
            </ToolTipInput>
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              id="date"
              fullWidth
              label="Publication Date"
              type="date"
              defaultValue="2017-05-24"
              value={props.date}
              onChange={(e) => props.editDateHandler(e.target.value)}
              className={classes.halfWidth}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <ToolTipInput
              label="Location"
              value={props.location}
              onChange={(e) => props.editLocationHandler(e.target.value)}
              placeholder="Location"
            >
              Name of the city, state or country where the publisher of a source is located. For written sources, this can usually be found on the title page. It is not always required, depending on the style.
            </ToolTipInput>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                let authors = props.contributors.filter(el => el.contrib === 'Author');
                let contributors = props.contributors.filter(el => el.contrib !== 'Author');
                console.log(authors);
                console.log(props.srcTitle);
                console.log(props.conTitle);
                console.log(contributors);
                console.log(props.version);
                console.log(props.number);
                console.log(props.publisher);
                console.log(props.pubDate);
                console.log(props.location);
                let citation = new MLA8Citation(authors, props.srcTitle, props.conTitle, contributors, props.version, props.number, props.publisher, props.pubDate, props.location);
                props.editEditorStateHandler(EditorState.createWithContent(stateFromHTML(citation.HTMLcitation)));
              }}
            >
              Generate Citation
            </Button>
          </Grid>
        </Grid>
        {/* number, maybe split field? */}
      </form>
      
      <Preview />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MLA8Form)