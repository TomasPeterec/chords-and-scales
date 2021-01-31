const express = require("express")
const bodyParser = require("body-parser")

const app = express()
var keyCursor="Povodny";
var number2="Dodatok";

app.use(bodyParser.urlencoded({extended: true}))



var state = {indexes: {}, chordShapes: {}, aid: {}}

var allTunesOnKeyboard = [
    {tune: "A", oct: 0}, //0
    {tune: "A#", oct: 0}, //1
    {tune: "B", oct: 0}, //2
    {tune: "C", oct: 1}, //3
    {tune: "C#", oct: 1}, //4
    {tune: "D", oct: 1}, //5
    {tune: "D#", oct: 1}, //6
    {tune: "E", oct: 1}, //7
    {tune: "F", oct: 1}, //8
    {tune: "F#", oct: 1}, //9
    {tune: "G", oct: 1}, //10
    {tune: "G#", oct: 1}, //11
    {tune: "A", oct: 1}, //12
    {tune: "A#", oct: 1}, //13
    {tune: "B", oct: 1}, //14
    {tune: "C", oct: 2}, //15
    {tune: "C#", oct: 2}, //16
    {tune: "D", oct: 2}, //17
    {tune: "D#", oct: 2}, //18
    {tune: "E", oct: 2}, //19
    {tune: "F", oct: 2}, //20
    {tune: "F#", oct: 2}, //21
    {tune: "G", oct: 2}, //22
    {tune: "G#", oct: 2}, //23
    {tune: "A", oct: 2}, //24
    {tune: "A#", oct: 2}, //25
    {tune: "B", oct: 2}, //26
    {tune: "C", oct: 3}, //27
    {tune: "C#", oct: 3}, //28
    {tune: "D", oct: 3}, //29
    {tune: "D#", oct: 3}, //30
    {tune: "E", oct: 3}, //31
    {tune: "F", oct: 3}, //32
    {tune: "F#", oct: 3}, //33
    {tune: "G", oct: 3}, //34
    {tune: "G#", oct: 3}, //35
    {tune: "A", oct: 3}, //36
    {tune: "A#", oct: 3}, //37
    {tune: "B", oct: 3}, //38
    {tune: "C", oct: 4}, //39
    {tune: "C#", oct: 4}, //40
    {tune: "D", oct: 4}, //41
    {tune: "D#", oct: 4}, //42
    {tune: "E", oct: 4}, //43
    {tune: "F", oct: 4}, //44
    {tune: "F#", oct: 4}, //45
    {tune: "G", oct: 4}, //46
    {tune: "G#", oct: 4}, //47
    {tune: "A", oct: 4}, //48
    {tune: "A#", oct: 4}, //49
    {tune: "B", oct: 4}, //50
    {tune: "C", oct: 5}, //51
    {tune: "C#", oct: 5}, //52
    {tune: "D", oct: 5}, //53
    {tune: "D#", oct: 5}, //54
    {tune: "E", oct: 5}, //55
    {tune: "F", oct: 5}, //56
    {tune: "F#", oct: 5}, //57
    {tune: "G", oct: 5}, //58
    {tune: "G#", oct: 5}, //59
    {tune: "A", oct: 5}, //60
    {tune: "A#", oct: 5}, //61
    {tune: "B", oct: 5}, //62
    {tune: "C", oct: 6}, //63
    {tune: "C#", oct: 6}, //64
    {tune: "D", oct: 6}, //65
    {tune: "D#", oct: 6}, //66
    {tune: "E", oct: 6}, //67
    {tune: "F", oct: 6}, //68
    {tune: "F#", oct: 6}, //69
    {tune: "G", oct: 6}, //70
    {tune: "G#", oct: 6}, //71
    {tune: "A", oct: 6}, //72
    {tune: "A#", oct: 6}, //73
    {tune: "B", oct: 6}, //74
    {tune: "C", oct: 7}, //75
    {tune: "C#", oct: 7}, //76
    {tune: "D", oct: 7}, //77
    {tune: "D#", oct: 7}, //78
    {tune: "E", oct: 7}, //79
    {tune: "F", oct: 7}, //80
    {tune: "F#", oct: 7}, //81
    {tune: "G", oct: 7}, //82
    {tune: "G#", oct: 7}, //83
    {tune: "A", oct: 7}, //84
    {tune: "A#", oct: 7}, //85
    {tune: "B", oct: 7}, //86
    {tune: "C", oct: 8}, //87
  
];

state.indexes.keyCursor = 39 //39 is basic C in the middle of keyboard
state.indexes.number2 = 0
state.chordShapes.majorTriad = [[0, 4, 7], "Major"]
state.chordShapes.minorTriad = [[0, 3, 7], "Minor"]
state.chordShapes.major7 = [[0, 4, 7, 10], "Major 7"]
state.chordShapes.minor7 = [[0, 3, 7, 10], "Minor 7"]
state.chordShapes.major6 = [[0, 4, 7, 9], "Major 6"]
state.chordShapes.majorMaj7 = [[0, 4, 7, 11], "Major Maj 7"]
state.aid.curentOutput = []
state.aid.testOutput = []
state.indexes.number4 = 0
state.indexes.newKey = "C"
state.aid.demo01 = []
state.aid.demo02 = []
state.aid.demo03 = []
state.aid.demo04 = []
state.aid.demo05 = []
state.aid.demo06 = []
state.aid.demo07 = []
state.aid.demo08 = []




function findNearestKey(desired, actual){
    for (let i = 0; i < 12; i++) {
            if(allTunesOnKeyboard[actual + i].tune === desired){
            return actual + i
        }

        if(allTunesOnKeyboard[actual - i].tune === desired){
            return actual - i
        }
      }
}

function chordIndexesFromRoot(rootTone, chordShape){
    var newChordShape = []
    for (let i = 0; i < chordShape[0].length; i++) {
        newChordShape[i] = chordShape[0][i] + rootTone
    }
    return newChordShape
}


function tuneFromIndex(index1){
return allTunesOnKeyboard[index1].tune
}

function chordFromIndexes(tunesArray){
var newTunesArray = []
for (let i = 0; i < tunesArray.length; i++) {
    newTunesArray[i] = allTunesOnKeyboard[tunesArray[i]].tune;
}
return newTunesArray
}

function chordNameToShape(chName){
    for(const chShape in state.chordShapes)
        if(state.chordShapes[chShape][1] === chName){
            return state.chordShapes[chShape]
        }
}


function noteToNegativeHarmony(tonikaNote,toneToChange){
    if((tonikaNote+3) >= toneToChange){
        return (tonikaNote+4) + ((tonikaNote+3) - toneToChange)
    }
    if((tonikaNote+3) < toneToChange){
        return (tonikaNote+4) - (toneToChange - (tonikaNote+3))
    }
}

function chordToNegativeHarmony(tonikaNote,chordToChange){
    var newNegativeChord = []
    for (let i = 0; i < chordToChange.length; i++) {
        newNegativeChord[i] = noteToNegativeHarmony(tonikaNote,chordToChange[i]);
    }
    return newNegativeChord
}

function chordThickening(arrayOfNotes){
    var newArrayOfNotes = arrayOfNotes.concat([])
    newArrayOfNotes.sort(function(a, b){return a - b});
    var testApprovement = false
    while(testApprovement === false){
        for (let i = 0; i < newArrayOfNotes.length; i++) {
            if((newArrayOfNotes[0] + 12) < newArrayOfNotes[i]){
                newArrayOfNotes[i] = newArrayOfNotes[i] - 12
                testApprovement = false
            }else{
                testApprovement = true
            }
        }
    }
    return newArrayOfNotes.sort(function(a, b){return a - b});
}


function getChordShapeFromSetOfNotes(arrayOfNotes){
    var newArrayOfNotes = arrayOfNotes.concat([])
    var firstValue = newArrayOfNotes[0]
    for (let i = 0; i < newArrayOfNotes.length; i++) {
        newArrayOfNotes[i] = newArrayOfNotes[i] - firstValue;
    }
    return newArrayOfNotes
}

function compareChordShapes(arrayOfNotes){
    var returnOfRun = false
    for(const chShape in state.chordShapes){
        if(JSON.stringify(state.chordShapes[chShape][0]) === JSON.stringify(arrayOfNotes)){
            returnOfRun = state.chordShapes[chShape].concat([])
         }


         
         
    }
    return returnOfRun
}

const arraysEqual = (a, b) => a.join() === b.join()

function whichbasicNote(chordDbPatern, originalCurentPatern){
    var thickedOriginalCurentPatern = chordThickening(originalCurentPatern)
    var CurentPaternToZero = getChordShapeFromSetOfNotes(thickedOriginalCurentPatern)
    var underFirstindex = 0
       
    for (let i = 0; i < CurentPaternToZero.length; i++) {

        if(arraysEqual(chordDbPatern,CurentPaternToZero) === true){
            return thickedOriginalCurentPatern[i]
        }
        
        CurentPaternToZero[0] = 12
        CurentPaternToZero.push(CurentPaternToZero.shift());

        underFirstindex = CurentPaternToZero[0]
        
        for(let c = 0; c < CurentPaternToZero.length; c++){
            CurentPaternToZero[c] = CurentPaternToZero[c] - underFirstindex
            
        }
        
    }
     
}

function findChordOrScale(arrayOfNotes01){
    var newArrayOfNotes = arrayOfNotes01.concat([])
    var chordName = ""
    var nextResult = ""
    newArrayOfNotes = chordThickening(newArrayOfNotes);
    newArrayOfNotes = getChordShapeFromSetOfNotes(newArrayOfNotes)
    chordName = compareChordShapes(newArrayOfNotes)
    nextResult = whichbasicNote(chordName[0],arrayOfNotes01)


    return  [chordName[1], allTunesOnKeyboard[nextResult].tune]
}





const CHORD_TYPES = ["Major", "Major 7", "Major 6", "Major Maj 7", "Minor", "Minor 7"]

app.get("/", (req, res) => {
    res.send(`
<form method="post">
<input step="any" type="number" name="keyCursor" value="${state.indexes.keyCursor || 39}"/>
<input step="any" name="newKey" value="${state.indexes.newKey || "C"}" />
<select name="chords" id="chordList">
    ${CHORD_TYPES.map(
        chordType =>
            `<option ${state.aid.demo03 === chordType ? "selected" : ""} value="${chordType}">
                ${chordType}
            </option>`
    )}
</select>
<input type="submit"/>
</form>
   
        <br/><br/>
        ${state.aid.demo01}
        <br/><br/>
        ${state.aid.demo03}
        <br/><br/>One note to negative: 
        ${state.aid.demo04}
        <br/><br/>
        ${state.aid.demo05}
        <br/><br/>One chord to negative: 
        ${state.aid.demo06}
        <br/><br/>
        ${state.aid.demo07}
        <br/><br/>
        ${state.aid.demo08}
        <br/><br/>
        ${state.aid.demo09}
        



        
        
    
    `)
})

app.post("/", (req, res) => {
    state.indexes = req.body

    state.indexes.number4 = findNearestKey(state.indexes.newKey, parseInt(state.indexes.keyCursor))
    
    
    state.aid.demo01 = chordFromIndexes(chordIndexesFromRoot(parseInt(state.indexes.number4), chordNameToShape(state.indexes.chords)))
    
    state.aid.demo03 = state.indexes.chords


    state.aid.demo04 = noteToNegativeHarmony(39,41)

    state.aid.demo05 = allTunesOnKeyboard[state.aid.demo04].tune

    state.aid.demo06 = chordToNegativeHarmony(39, [38,41,44])

    state.aid.demo07 = chordFromIndexes(state.aid.demo06)

    state.aid.demo08 = findChordOrScale([39,67,58,36])

    state.aid.demo09 = chordThickening([39,67,58,36])


   
    res.redirect(302, "/")

   

})

app.get("/kokos/:x/kokos", (req, res) => {
    res.send(req.params.x)
})

app.listen(8080, "0.0.0.0") 
console.log("listeing on http://localhost:8080")
