export default async function getMenu() {
    // Get menu from berk grab n go
    let menu;
    try{
      menu = await (await fetch("http://172.31.134.127:8000/getmenu/frank")).json();
      if(JSON.stringify(menu) === "{}"){
          return 0;
      }
      return menu;
    }
    catch(e){
      console.error(e);
    }
}