


fetch("https://planas10.github.io/game.json").then(response => response.json()).then(data => game(data));

let game_data;

let inventory = [];

let current_room = 0;
let items_picked = [];


function game (data)
{
	game_data = data

	document.getElementById("terminal").innerHTML = "<p><strong>¡Bienvenidos a ENTIerrame!</strong>El juego de terror definitivo.</p>";
	document.getElementById("terminal").innerHTML += "<p>Te encuentras en "+game_data.rooms[current_room].name+". ¿Qué quieres hacer?</p>";

	console.log(data.rooms[0].name);
}

console.log(current_room);

function terminal_out (info)
{
	let terminal = document.getElementById("terminal");

	terminal.innerHTML += info;

	terminal.scrollTop = terminal.scrollHeight;
}

function parseCommand(command){
	console.log("El comando ", command);
	switch (command){
		case "ver":
			let items = "";
			let items_num = game_data.rooms[current_room].items.length;
			for (let i = 0; i < items_num; i++){
				items += game_data.rooms[current_room].items[i]+", ";
			}
			terminal_out("<p>Puedes ver: "+items);
			terminal_out("<p>"+game_data.rooms[current_room].description+"</p>");
			break;

		case "ir":
			let doors = "";
			let doors_num = game_data.rooms[current_room].doors.length;
			for (let i = 0; i < doors_num; i++){
				doors += game_data.rooms[current_room].doors[i]+", ";
			}
			terminal_out("<p>Puedes ir a: "+doors+"</p>");
			break;

		case "coger":

			let pickable_items = "";
			let room_items = game_data.rooms[current_room].items;
			for	(let i = 0; i < room_items.length; i++){
				if (game_data.items[i].pickable == true){
					pickable_items += i+",";
				}
			}
			terminal_out("Hasta aqui se llega al menos");
			terminal_out("<p>Puedes coger: "+pickable_items);
			break;

		case "inventario":
			
			terminal_out("<p>Inventario: "+inventory);
			
		break;

		default:
			terminal_out("<p><strong>Error</strong>: "+"'"+command+"'"+" commando no encontrado</p>");
	}
}

function getRoomNumber (room)
{
	for (let i = 0; i < game_data.rooms.length; i++)
	{
		if (game_data.rooms[i].id == room)
		{
			return i;
		}
	}
}

function getDoorNumber (door)
{
	for (let i = 0; i < game_data.doors.length; i++)
	{
		console.log(door);
		if (game_data.doors[i].id == door)
		{
			return i;
		}
	}
}

function getItemNumber(item){
	for (let i = 0; i < game_data.items.length; i++)
	{
		console.log(item);
		if (game_data.items[i].id == item)
		{
			return i;
		}
	}
}


function parseInstruction (instruction)
{

	console.log("La instrucción ", instruction);

	switch (instruction[0]){
		case "ver":
			let item_num_see = getItemNumber(instruction[1]);
			if (item_num_see < 0){
				return;
			}
			else{
				terminal_out(game_data.items[item_num_see].description);
			}
			break;

		case "ir":
			let door_num = getDoorNumber(instruction[1]);
			if (door_num < 0){;
				console.log("Puerta erronea");
				return;
			}
			console.log("Door num: "+door_num);
			let room_num = getRoomNumber(game_data.doors[door_num].rooms[0]);
			if (room_num < 0){
				conaole.log("habitación erronea");
				return;
			}
			console.log("Room num: "+room_num);
			if (room_num == current_room){
				current_room = getRoomNumber(game_data.doors[door_num].rooms[1]);
			}
			else{
				current_room = room_num;
			}
			break;

		case "coger":

			game_data.rooms[current_room].items.forEach(function (item) {
				if (item == instruction[1]) {
				
					let item_num = game_data.rooms[current_room].items.indexOf(item);
					
					if (item_num < 0) {
						console.log("Error al borrar el item de la habitación");
						return;
					}
					
					item_num = findItemNumber(item);
					console.log(game_data.items[item_num]);

					if (game_data.items[item_num].pickable == false) {
						terminalOut("<p>El objeto<strong> " + item + "</strong> no puede ser cogido</p>");
						return;
					}
					
					game_data.rooms[current_room].items.forEach(item => {
						if (item == instruction[1]) {
							items_picked.push(game_data.rooms[current_room].items.splice(item_num, 1));
						}
					});
					
					terminalOut("<p>El objeto<strong> " + item + "</strong> ha sido añadido a tu inventario</p>");
					return;
				}
			});

			break;
			case 'inventario':

				let item_inventory_num = findItemNumber(instruction[1]);
				
				if (item_inventory_num < 0) {
					terminalOut("<p>El objeto<strong> " + instruction[1] + "</strong> no se encuentra en tu inventario</p>");
					return;
				}
				
				let item_inventory_description = game_data.items[item_inventory_num].description;
				
				terminalOut("<p><strong>" + instruction[1] + ":</strong> " + item_inventory_description + "</p>");
			
			break;

		default:
			terminal_out("<p><strong>Error</strong>: "+instruction[0]+" commando no encontrado</p>");
	}
}



function readAction()
{
		let instruction = document.getElementById("commands").value;
		let instruction_trim = instruction.trim();

		let data = instruction_trim.split(" ");

		if (data.length == 0 || instruction_trim == ""){
			document.getElementById("terminal").innerHTML += "<p><strong>Error</strong>: escribe un comando valido</p>";
			return;
		}

		if (data.length == 1){
			parseCommand(data[0]);
		}
		else{
			parseInstruction(data);
		}
}
