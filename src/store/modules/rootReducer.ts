import { combineReducers } from "@reduxjs/toolkit";
import user from "./user/UserSlice";
//import login from "./login/LoginSlice";
import tarefa from "./tarefas/TarefasSlice";

export default combineReducers({
    user,
    //login,
    tarefa,
});