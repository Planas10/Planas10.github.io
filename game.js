
{
	"rooms":[
		{"id":"parking",
		"name":"parking de ENTI",
		"description":"El parking que no puedes usar",
		"items":["piedra","bicicleta"],
		"doors":["principal","salida"]
}
	],
	"items":[
		{"id":"piedra","name":"pedrusco mugroso", "description":"Es una piedra sucia","pickable":"true"},
		{"id":"bicicleta","name":"bicicleta de la Hello Kitty", "description":"Tiene escrito 'Richard' en el manillar","pickable":"false"}
	]
	"doors":[
		{"id":"principal","description":"Puerta de entrada a ENTI","rooms":["parking","hall"]},
		{"id":"salida","description":"Por aqui se escapa de Richard"}
	]

}