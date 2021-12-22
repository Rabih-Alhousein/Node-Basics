
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}
/**
* Decides what to do depending on the data that was received
* This function receives the input sent by the user.
* 
* For example, if the user entered 
* ```
* node tasks.js batata
* ```
* 
* The text received would be "batata"
* This function  then directs to other functions
* 
* @param  {string} text data typed by the user
* @returns {void}
*/
function onDataReceived(text) {
  text = text.replace(/\n/, '').trim()
  if (text === 'quit\n' || text === 'exit') {
    quit();
  }

  else if (text.startsWith('hello')) {
    hello(text);
  }
  else if (text === 'help') {
    help();
  }
  else if (text === 'list') {
    list();
  }
  else if (text.startsWith('add')) {
    add(text);
  }
  else if (text.startsWith('remove')) {
    remove(text);
  }
  else if (text.startsWith('edit')) {
    edit(text);
  }
  else {

    unknownCommand(text);
  }
}


var tasks = ["task1", "task2"]


/**
* prints "unknown command"
* This function is supposed to run when all other commands have failed
*
* @param  {string} c the text received
* @returns {void}
*/
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"')
}


/**
* Says hello
*
* @returns {void}
*/
function hello(text) {
  text = text.split(" ")
  console.log('hello! ' + (text[1] || ''))
}


/**
* list 
*
* @returns {void}
*/
function list() {
  console.log("This is the list of all tasks\n")
  for (let i in tasks) {
    console.log("task " + (i * 1 + 1) + ": " + tasks[i] + '\n')
  }
}


/**
* list add task
*
* @returns {void}
*/
function add(text) {
  text == "add" ? console.log("Error") : tasks.push(text.substring(4))
}

/**
* list remove task
*
* @returns {void}
*/
function remove(text) {
  text = text.split(" ")
  text == "remove" ? tasks.pop() : !isNaN(text[1]) && (text[1] <= tasks.length) ? tasks.splice(text[1] - 1, 1) : console.log("item does not exist")
}


/**
* edit
*
* @returns {void}
*/
function edit(text) {
  text = text.split(' ')
  text == "edit" ? console.log("Error") : !isNaN(text[1]) && (text[1] <= tasks.length) ? tasks[text[1] - 1] = text.slice(2).join(' ') : tasks[tasks.length - 1] = text.slice(1).join(' ')
  /* if the user input a number bigger than the number of the tasks this will change the last item also */
}






/**
*  help 
*
* @returns {void}
*/
function help() {
  console.log(`
  command\t\tdesciption
  ----------------------------------
  hello\t\t\tgreeting .
  hello x\t\tgreeting x
  list\t\t\tlist of tasks
  add x\t\t\tadd task x
  remove\t\tremove last task
  remove x\t\tremove task number x
  edit x\t\tedit task number x
  quit OR exit\t\t\end the application
  help\t\t\tto show command.
  ----------------------------------
  `)
}



/**
* Exits the application
*
* @returns {void}
*/
function quit() {
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Rabih Al Houssein")


