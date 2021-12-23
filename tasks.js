
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


const fs = require('fs');

function startApp(name) {

  json = fs.readFile('database.json', (err, data) => {
    if (err) {
      console.log('\u001b[' + 31 + 'm' + "NB: Couldn't read the JSON file" + '\u001b[0m')/* writing red message in console */
      throw err;
    }
    tasks = JSON.parse(data)
  });
  /*   try {
      json = fs.readFile('tasks.json')
      console.log(json)
    }
    catch (err) {
      console.log(err)
    } */
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
  if (text === 'quit' || text === 'exit') {
    quit();
  }

  else if (text.split(" ")[0] === ('hello')) {
    hello(text);
  }
  else if (text === "help") {
    help();
  }
  else if (text === 'list') {
    list();
  }
  else if (text.split(" ")[0] === 'add') {
    add(text);
  }
  else if (text.split(" ")[0] === 'remove') {
    remove(text);
  }
  else if (text.split(" ")[0] === 'edit') {
    edit(text);
  }
  else if (text.split(" ")[0] === 'check') {
    check(text);
  }
  else if (text.split(" ")[0] === 'uncheck') {
    uncheck(text);
  }
  else {

    unknownCommand(text);
  }
}

var tasks = [["coding", true], ["english", false]]
var undone = "[ ]"
var done = "[✓]"

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
    if (tasks[i][1] == true) {
      console.log("task " + (i * 1 + 1) + ": " + done + " " + tasks[i][0] + '\n')
    } else console.log("task " + (i * 1 + 1) + ": " + undone + " " + tasks[i][0] + '\n')
  }
}


/**
* list add task
*
* @returns {void}
*/
function add(text) {
  text == "add" ? console.log("Error") : tasks.push([text.substring(4), false])
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
  text == "edit" ? console.log("Error") : !isNaN(text[1]) && (text[1] <= tasks.length) ? tasks[text[1] - 1][0] = text.slice(2).join(' ') : tasks[tasks.length - 1][0] = text.slice(1).join(' ')
}



/**
* edit
*
* @returns {void}
*/
function check(text) {
  text = text.split(' ')
  text == "check" ? console.log("Error") : !isNaN(text[1]) && (text[1] <= tasks.length) ? tasks[text[1] - 1][1] = true : isNaN(text[1]) ? console.log("please enter the number of task to be checked") : console.log("item does not exist")
}

/**
* edit
*
* @returns {void}
*/
function uncheck(text) {
  text = text.split(' ')
  text == "uncheck" ? console.log("Error") : !isNaN(text[1]) && (text[1] <= tasks.length) ? tasks[text[1] - 1][1] = false : isNaN(text[1]) ? console.log("please enter the number of task to be checked") : console.log("item does not exist")


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
  const path = require('path');
  fs.writeFileSync(path.resolve(__dirname, 'database.json'), JSON.stringify(tasks));
  process.exit();
}

// The following line starts the application
startApp("Rabih Al Houssein")


