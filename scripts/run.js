
//master function
const main = async () => {

    const [owner, randomPerson] = await hre.ethers.getSigners();
    //compile contract
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    //run eth local network, just for this contract, then destroys the local network
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log('Contract deployed to: ', waveContract.address);
    console.log('Contract deployed by: ', owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
  
    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();
    randomWavers.push(randomPerson.address);
    

    waveCount = await waveContract.getTotalWaves();
    
};


//run the masterfucntion with a try/catch block to check for errors. 
const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error){
        console.log(error);
        process.exit(1)
    }
};

runMain();