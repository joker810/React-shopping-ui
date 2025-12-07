

const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function fetchWithExponentialBackOff(retries=5, fn, base=300){
    for(attempts=0; attempts<retries;attempts++){
        try{
            return await  fn();
        }
        catch(err){
            let jitter = Math.random() * 100;
            let delay = base * (2 ** attempts) + jitter;
            console.log(`attempts ${attempts +1} : delay ${delay.toFixed()}`);
            await sleep(delay); 
        }
    }
    throw new Error('failed after retry');


}