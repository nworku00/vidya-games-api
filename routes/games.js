var express = require('express');
var router = express.Router();

const fs = require('fs');

const gamesFile = './data/games.json'


router.get('/', function (req, res, next) {
    fs.readFile(gamesFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send('there was a problem reading the file')
            return;
        }
        res.json(JSON.parse(data));
    })
//   res.send('hello fellow gamers');
});

router.post('/', (req, res) => {
    fs.readFile(gamesFile, 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send('there was a problem reading the file')
            return;
        }
        const games = JSON.parse(data)
        const newGame = {
            id: (games.length + 1),
            title: req.body.title,
            yearReleased : req.body.yearReleased,
            searchVer: req.body.searchVer,
            genre: req.body.genre
        }
        games.push(newGame)
        //replace the contents of og gamelist with new pushed gamelist
        fs.writeFile(gamesFile, JSON.stringify(games), err => {
            if (err) {
                console.log(err)
                res.status(500).send('there was a problem writing the file')
                return;
            }
            // res.json(newGame)
        })
    })
    res.send('post request accepted')
})

router.get('/i/:id', (req, res) => {
    let id = parseInt(req.params.id)
    fs.readFile(gamesFile, 'utf-8', (err, data) => {
        if(err) {
            console.error(err);
            res.status(500).send('There was a problem reading the file.')
            return;
        }
        const games = JSON.parse(data)
        const foundGame = games.find(game => game.id === id)
        if(!foundGame) {
            res.status(404).send('Game not found')
            return;
        }
        res.json(foundGame)
    })
})

router.get('/t/:title', (req, res, next) => {
    let { title } = req.params 
    fs.readFile(gamesFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send('there was a problem reading the file')
            return;
        }
        
        let games = JSON.parse(data)
        
        let foundGame = games.find(game => game.searchVer === title)
        if(!foundGame) {
            res.status(404).send('Game not found')
            return;
        }
        res.send(foundGame)
    })
})
router.delete('/t/:title', (req, res, next) => {
    let { title } = req.params
    fs.readFile(gamesFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send('there was a problem reading the file')
            return;
        }
        const games = JSON.parse(data);
        let foundGame = games.find(game => game.searchVer === title)
        if(!foundGame) {
            res.status(404).send('Game not found')
            return;
        }
        let foundIndex = games.indexOf(foundGame)
        games.slice(foundIndex, 1)
        res.status(204).send('content deleted')
    })
})
router.get('/g/:genre', (req, res, next) => {
    let { genre } = req.params 
    fs.readFile(gamesFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send('there was a problem reading the file')
            return;
        }
        const games = JSON.parse(data)
        const foundGames = games.filter(game => {
            return game.genre.some(gen => gen == genre);
        });
        res.send(foundGames)
    })
})

module.exports = router;