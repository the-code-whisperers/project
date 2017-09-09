var map =
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
    var insert = Math.floor(splitPassword.length/splitSalt.length)+1

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
