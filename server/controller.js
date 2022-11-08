const houses = require(`./db.json`)
let globalId = 4
module.exports = {
    getHouses: (req, res) =>{
        res.status(200).send(houses)
    },

    createHouse: (req, res) =>{
        let {address, price, imageURL} = req.body

        let newHouse = {
            id: globalId,
            address,
            price,
            imageURL
        }
        houses.push(newHouse)

        res.status(200).send(houses)
        globalId++
    },

    updateHouse: (req, res) =>{
        let {id} = req.params
        let {type} = req.body

        let index = houses.findIndex(house => house.id === +id)

        if(houses[index].price <= 9999 && type === `minus`){
            res.status(400).send(`Cannot go below 0`)
        }
        else if(type === `plus`){
            houses[index].price += 10000
            res.status(200).send(houses)
        }
        else if(type === `minus`){
            houses[index].price -= 10000
            res.status(200).send(houses)
        }
        else{
            res.sendStatus(400)
        }
    },

    deleteHouse: (req, res) =>{
        let index = houses.findIndex(h => h.id === +req.params.id)    
        houses.splice(index, 1)
        res.status(200).send(houses)
    }
}