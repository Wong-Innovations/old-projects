import * as actionTypes from './actions';
import Firebase from './firestore';
import fakeData from '../fakedata';

const initialState = {
  mobileOpen: false,
  foldersOpen: [],
};

for (let i = 0; i < fakeData.folders.length; i++) {
  if (fakeData.folders[i].name !== "Misc") initialState.foldersOpen.push(false);
}

Firebase.firestore().collection('users').doc('test_id').get()
  .then((snapshot) => {
    console.log(snapshot.data());
  })
  .catch((err) => {
    console.log('Error getting data', err);
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_MOBILE_OPEN:
      return {
        ...state,
        mobileOpen: !state.mobileOpen
      }
    case actionTypes.ADD_FOLDER_TO_DRAWER:
      return {
        ...state,
        foldersOpen: [
          ...state.foldersOpen,
          false
        ]
      }
    case actionTypes.CHANGE_FOLDER_OPEN:
      return {
        ...state,
        foldersOpen: state.foldersOpen.map((folderOpen, index) => (index === action.index)? !folderOpen : folderOpen)
      }

    default:
      return state;
  }
}

export default reducer;