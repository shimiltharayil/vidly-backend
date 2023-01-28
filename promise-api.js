const p = Promise.reject( new Error('Invalid'))

p.catch(err => console.log(err))