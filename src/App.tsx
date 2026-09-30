import type {Launch, LaunchesResponse} from './types/types';
import LaunchList from './LaunchList/LaunchList.tsx'
import LaunchModal from "./LaunchModal/LaunchModal.tsx";
import {useEffect, useReducer} from "react";
import { LaunchContext } from './context/LaunchContext.tsx';


type State = {
  launches: Launch[],
  isModalOpen: boolean,
  selectedLaunch: Launch | null,
  isLoading: boolean,
}

type Action =
    | {type: 'launchesLoaded',
      payload: Launch[],

}
    | {type: 'launchSelected',
      payload: Launch,
    }
    | {type: 'modalClosed'}

const initialState: State = {
  launches: [],
  isModalOpen: false,
  selectedLaunch: null,
  isLoading: true,
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'launchesLoaded':
      return {
        ...state,
        launches: action.payload,
        isLoading: false,
      }
      case 'modalClosed':
        return {
          ...state,
          isModalOpen: false,
          selectedLaunch: null,
        }
        case 'launchSelected':
          return {
            ...state,
            selectedLaunch: action.payload,
            isModalOpen: true,
          }
          default:
            throw new Error('Unknown action type')
  }
}


function App() {

  const [state, dispatch] = useReducer(reducer,initialState);

  const handleLaunchSelected = (launch: Launch) => {
    dispatch({
      type: 'launchSelected',
      payload: launch
    })
  }

  const handleModalClose = () => {
    dispatch({
      type: 'modalClosed',
    })
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://kata-spacex.onrender.com/api/launches')
      const data: LaunchesResponse = await response.json()

      dispatch({
        type: 'launchesLoaded',
        payload: data.launches,
      })
    }
    fetchData()
  }, [])

  return (
     <LaunchContext.Provider value={{
       selectLaunch: handleLaunchSelected,
     }}>
       <LaunchList
           launches={state.launches}
           isLoading={state.isLoading}
       />
       {state.isModalOpen && state.selectedLaunch && (
           <LaunchModal
               selectedLaunch={state.selectedLaunch}
               onClose={handleModalClose}
           />
       )}
     </LaunchContext.Provider>
  )
}

export default App
