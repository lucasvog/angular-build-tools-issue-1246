const __wrapper = async (call)=>{
    console.log("wrapper called");
    await call();
}