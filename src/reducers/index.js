var initialState = [];
var GLOBAL_ID = 1;
const todos = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [
        ...state,
        {
          id: GLOBAL_ID++,
          title: action.title,
          completed: false
        }
      ];
    case "TOGGLE_COMPLETION":
      console.log('action', action);
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "REMOVE_ITEM":
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};

export default todos;
