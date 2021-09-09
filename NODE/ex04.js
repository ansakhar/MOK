const words = ["How", "are", "you", "?"]

let sentence = ""

words.forEach(word => 
    { sentence = sentence + word + " "
        }
   );
   console.log(sentence)

const sentence_reduce = words.reduce((result, word) => { 
    return result + ' ' + word 
  })

  console.log(sentence_reduce)