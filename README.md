## This api exposes a lsit of games and some descriptive information

`/games` - GET
- gets list of all available games

`/games`- POST
- adds a game to list
- example post format :
```
{
    "title": "Red Dead Redemption 2",
    "yearReleased": 2018,
    "searchVer": "red-dead-redemption-2",
    "genre": ["action-adventure", "western", "open-world"]
}
```
`/games/t/:title` - GET
- returns a single game from a title
- use the game's `searchVer` value in url, ex: if you want Read Dead Redemption 2, use `/games/t/red-dead-redemption-2`
- example response :
```
{
        "id": 1,
        "title": "Red Dead Redemption 2",
        "yearReleased": 2018,
        "searchVer": "red-dead-redemption-2",
        "genre": ["action-adventure", "western",    "open-world"]
    }
```

`/games/g/:genre` - GET
- returns all games with genre
- example response from `/games/g/fantasy`
```
{
        "id": 2,
        "title": "The Legend of Zelda: Breath of the Wild",
        "yearReleased": 2017,
        "searchVer": "the-legend-of-zelda",
        "genre": ["action-adventure", "open-world", "fantasy"]
    },
{
        "id": 6,
        "title": "The Witcher 3: Wild Hunt",
        "yearReleased": 2015,
        "searchVer": "the-witcher-3",
        "genre": ["action-role-playing", "open-world", "fantasy"]
    }
```
`/games/i/:id` - GET
- returns single game with Id
- example response from `/games/i/1`
```
{
        "id": 1,
        "title": "Red Dead Redemption 2",
        "yearReleased": 2018,
        "searchVer": "red-dead-redemption-2",
        "genre": ["action-adventure", "western",    "open-world"]
    }
```