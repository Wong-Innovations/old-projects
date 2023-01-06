import * as actionTypes from './actions';
import { EditorState } from 'draft-js';

const initialState = {
  contribFields: [{
    contrib: 'Author',
    fname: '',
    mname: '',
    lname: '',
    suffix: '',
  }],
  srcTitle: '',
  conTitle: '',
  version: '',
  number: '',
  publisher: '',
  date: false,
  location: '',
  pageLocation: 'Home',
  previewContent: EditorState.createEmpty(),
  quickciteFormat: 'MLA8',
  quickciteSource: '',
  quickciteMedium: 'Book',
  quickciteResults: [],
  quickcitePreviewContent: EditorState.createEmpty(),
  // ...
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CONTRIBUTOR:
      return {
        ...state,
        contribFields: [
          ...state.contribFields.slice(0, state.contribFields.length-1),
          {
            contrib: 'Author',
            fname: '',
            mname: '',
            lname: '',
            suffix: '',
          },
          ...state.contribFields.slice(state.contribFields.length-1),
        ],
      };
    case actionTypes.REMOVE_CONTRIBUTOR:
      return {
        ...state,
        contribFields: [
          ...state.contribFields.slice(0, action.index),
          ...state.contribFields.slice(action.index+1)
        ]
      };
    case actionTypes.EDIT_CONTRIBUTOR:
      return {
        ...state,
        contribFields: state.contribFields.map((contribField, index) =>
          (index === action.index)? {...contribField, [action.name]: action.event.target.value} : contribField
        )
      };
    case actionTypes.EDIT_SRCTITLE:
      return {
        ...state,
        srcTitle: action.title
      };
    case actionTypes.EDIT_CONTITLE:
      return {
        ...state,
        conTitle: action.title
      };
    case actionTypes.EDIT_VERSION:
      return {
        ...state,
        version: action.value,
      };
    case actionTypes.EDIT_NUMBER:
      return {
        ...state,
        number: action.value,
      };
    case actionTypes.EDIT_PUBLISHER:
      return {
        ...state,
        publisher: action.value,
      };
    case actionTypes.EDIT_DATE:
      return {
        ...state,
        date: Date.parse(action.value)? action.value : false,
      };
    case actionTypes.EDIT_LOCATION:
      return {
        ...state,
        location: action.value,
      };
    case actionTypes.EDIT_PAGE_LOCATION:
      return {
        ...state,
        pageLocation: action.page,
      };
    case actionTypes.EDIT_PREVIEW_CONTENT:
      return {
        ...state,
        previewContent: action.content,
      };
    case actionTypes.EDIT_QUICKCITE_FORMAT:
      return {
        ...state,
        quickciteFormat: action.value, 
      }
    case actionTypes.EDIT_QUICKCITE_SOURCE:
        return {
          ...state,
          quickciteSource: action.value, 
        }
    case actionTypes.EDIT_QUICKCITE_MEDIUM:
      return {
        ...state,
        quickciteMedium: action.value,
      }
    case actionTypes.EDIT_QUICKCITE_PREVIEW:
      return {
        ...state,
        quickcitePreviewContent: action.content,
      }
    case actionTypes.EDIT_QUICKCITE_RESULTS:
      return {
        ...state,
        quickciteResults: action.results,
      }

    default:
      return state;
  }
}

export default reducer;