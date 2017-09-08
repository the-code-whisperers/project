var map =
{
    "1": -1,
    "2": 1,
    "3": 2,
    "4": -2,
    "5": -3,
    "6": 3,
    "7": 4,
    "8": -4,
    "9": -5,
    "0": 5,
    "q": 6,
    "w": -6,
    "e": 7,
    "r": -7,
    "t": 8,
    "y": -8,
    "t": 9,
    "y": -9,
    "u": 10,
    "i": -10,
    "o": 11,
    "p": -11,
    "a": 12,
    "s": -12,
    "d": 13,
    "f": -13,
    "g": 14,
    "h": -14,
    "j": 15,
    "k": -15,
    "l": 16,
    "z": -16,
    "x": 17,
    "c": -17,
    "v": 18,
    "b": -18,
    "n": 19,
    "m": -19,
    "Q": 20,
    "W": -20,
    "E": 21,
    "R": -21,
    "T": 22,
    "Y": -22,
    "U": 23,
    "I": -23,
    "O": 24, 
    "P": -24,
    "A": 25,
    "S": -25,
    "D": 26,
    "F": -26,
    "G": 27,
    "H": -27,
    "J": 28,
    "K": -28,
    "L": 29,
    "Z": -29,
    "X": 30,
    "C": -30,
    "V": 31,
    "B": -31,
    "N": 32,
    "M": -32,
    "!": 33,
    "@": -33,
    "#": 34,
    "$": -34,
    "%": 35,
    "^": -35,
    "&": 36,
    "*": -36,
    "(": 37,
    ")": -37,
    "-": 38,
    "_": -38,
    "=": 39,
    "+": -39
}

var createSalt = function()
{
    var chars = ["1","2","3","4","5","6","7","8","9","0","q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"]
    var salt = ""

    for (var i=0; i<10; i++)
    {
        var r = Math.floor(Math.random() * chars.length);
        salt = salt+chars[r]
    }

    return salt;
}

var createHash = function(password, salt)
{
    var splitSalt = salt.split('')
    var splitPassword = password.split('')
    var addSalt = []
    var hash = ""
    var insert = Math.round(splitPassword.length/splitSalt.length)+1

    for (var i=0; i<splitPassword.length; i++)
    {
        addSalt.push(splitPassword[i])

        if (i%insert == 0 && splitSalt.length > 0)
        {
          addSalt.push(splitSalt[0])
          splitSalt.splice(0,1)
        }
    }

    for (var i=0; i<addSalt.length; i++)
    {
        var number = Math.abs(map[addSalt[i]])
        console.log(number)

        for (var key in map)
        {
            if (map[key] === number)
            {
              hash = hash + key
            }
        }
    }

    return hash;
}
