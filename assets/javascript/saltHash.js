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

var map2 =
{
    "q": 1,
    "w": math.complex(2,1),
    "1": math.complex(3,2),
    "e": math.complex(4,3),
    "r": 5,
    "2": math.complex(6,5),
    "t": math.complex(7,6),
    "y": math.complex(8,7),
    "3": 9,
    "u": math.complex(10,9),
    "i": math.complex(11,10),
    "4": math.complex(12,11),
    "o": 13,
    "p": math.complex(14,13),
    "5": math.complex(15,14),
    "a": math.complex(16,15),
    "s": 17,
    "6": math.complex(18,17),
    "d": math.complex(19,18),
    "f": math.complex(1,19),
    "7": 2,
    "g": math.complex(3,21),
    "h": math.complex(4,22),
    "8": math.complex(5,23),
    "j": 6,
    "k": math.complex(7,25),
    "9": math.complex(8,26),
    "l": math.complex(9,27),
    "z": 10,
    "0": math.complex(11,29),
    "x": math.complex(12,30),
    "c": math.complex(13,31),
    "!": 14,
    "v": math.complex(15,33),
    "b": math.complex(16,34),
    "@": math.complex(17,35),
    "n": 18,
    "m": math.complex(19,37),
    "#": math.complex(1,38),
    "Q": math.complex(2,39),
    "W": 3,
    "$": math.complex(4,41),
    "E": math.complex(5,42),
    "R": math.complex(6,43),
    "%": 7,
    "T": math.complex(8,45),
    "Y": math.complex(9,46),
    "^": math.complex(10,47),
    "U": 11,
    "I": math.complex(12,49),
    "&": math.complex(13,50),
    "O": math.complex(14,51), 
    "P": 15,
    "*": math.complex(16,53),
    "A": math.complex(17,54),
    "S": math.complex(18,55),
    "(": 19,
    "D": math.complex(1,57),
    "F": math.complex(2,58),
    ")": math.complex(3,59),
    "G": 4,
    "H": math.complex(5,61),
    "-": math.complex(6,62),
    "J": math.complex(7,63),
    "K": 8,
    "_": math.complex(9,65),
    "L": math.complex(10,66),
    "Z": math.complex(11,67),
    "X": 12,
    "C": math.complex(13,69),
    "=": math.complex(14,70),
    "V": math.complex(15,71),
    "B": 16,
    "+": math.complex(17,73),
    "N": math.complex(18,74),
    "M": math.complex(19,75)
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
        var number = math.re(map[addSalt[i]])
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

console.log(math.re(math.complex(1,2)))
