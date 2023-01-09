# install test tool

npm install --save react react-dom react-scripts

# install server tool

npm install --save-dev ts-node typescript

# install junit reporter

npm install jest-junit

# Test Plan

#### User Interface ####
TEST LIST
--------------------------------------------
   Test Suite1
   =========================================
   1.HTML SOURCE CODE
   2.UI ===> check TITLE is 'My Todo List'
   3.UI ===> check Todo input: name, priority, and submit button
   4.UI ===> check TodoItem Operation Button

#### Operation Function ####
--------------------------------------------
   Test Suite2
   =========================================
   1.AddTodo Component -> Does function postTodo work?
   2.TodoItem Component -> Does function patchTodo work?
   3.TodoItem Component -> Does function patchEdit work?
   4.TodoItem Component -> Does function deleteTodo work?
   5.App Component -> Does function deleteTodo show message when api fails?
   6.App Component -> Does function sortTasksByPriority work?
   7.App Component -> Does function sortTasksByTime work? 

#  Command
 test to show format data and file(junit.xml)
 npm run test:ci