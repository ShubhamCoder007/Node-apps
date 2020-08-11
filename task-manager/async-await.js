const add = (a, b) => {
    console.log('Gonna take 2 sec...')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0)
                reject('Cant be negative')
            resolve(a+b)
        }, 2000)
    })
}

const fun = async () => {
    const sum1 = await add(1,2)
    const sum2 = await add(sum1, 3)
    const sum3 = await add(sum2, 4)

    console.log(sum3)
}

// add(1,2).then(res => console.log(res)).catch(e => console.log(e))
fun()