

export const isSameSender = (allMessages:Imessage[],message:Imessage,index: number,userName : string)=>{
    console.log("allMessages isSameSender : ",allMessages,message);
    // return(
        
    //     index < allMessages.length-1 &&
    //     allMessages[index + 1].sender.userName !== message.sender.userName ||
    //     allMessages[index + 1].sender.userName === undefined &&
    //     allMessages[index].sender.userName !== userName
    // )
}

export const isLastMessage = (allMessages:Imessage[],index: number,userName : string)=>{
    return(
        index === allMessages.length-1 &&
        allMessages[allMessages.length - 1].sender.userName !== userName &&
        allMessages[allMessages.length - 1].sender.userName
    )
}