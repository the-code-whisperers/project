var map =
{
    "1": -31,
    "2": -30,
    "3": -29,
    "4": -28,
    "5": -27,
    "6": -26,
    "7": -25,
    "8": -24,
    "9": -23,
    "0": -22,
    "q": -21,
    "w": -20,
    "e": -19,
    "r": -18,
    "t": -17,
    "y": -16,
    "t": -15,
    "y": -14,
    "u": -13,
    "i": -12,
    "o": -11,
    "p": -10,
    "a": -9,
    "s": -8,
    "d": -7,
    "f": -6,
    "g": -5,
    "h": -4,
    "j": -3,
    "k": -2,
    "l": -1,
    "z": 1,
    "x": 2,
    "c": 3,
    "v": 4,
    "b": 5,
    "n": 6,
    "m": 7,
    "Q": 8,
    "W": 9,
    "E": 10,
    "R": 11,
    "T": 12,
    "Y": 13,
    "U": 14,
    "I": 15,
    "O": 16, 
    "P": 17,
    "A": 18,
    "S": 19,
    "D": 20,
    "F": 21,
    "G": 22,
    "H": 23,
    "J": 24,
    "K": 25,
    "L": 26,
    "Z": 27,
    "X": 28,
    "C": 29,
    "V": 30,
    "B": 31,
    "N": -32,
    "M": 32
}

var createSalt = function()
{
    var chars = ["1","2","3","4","5","6","7","8","9","0","q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"]
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

        if (i%insert ==0 && splitSalt.length > 0)
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