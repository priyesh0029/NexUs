

export const isSameSender = (allMessages:Imessage[],message:Imessage,index: number,userName : string)=>{
     
    return(
        
        index < allMessages.length-1 &&
        (allMessages[index + 1].sender.userName !== message.sender.userName ||
        allMessages[index + 1].sender.userName === undefined) &&
        allMessages[index].sender.userName !== userName
    )
}

export const isLastMessage = (allMessages:Imessage[],index: number,userName : string)=>{
    return(
        index === allMessages.length - 1 &&
        allMessages[allMessages.length - 1].sender.userName !== userName &&
        allMessages[allMessages.length - 1].sender.userName
    )
}

export const sameCenterMargin = (allMessages:Imessage[],message:Imessage,index: number,userName : string)=>{
    if(
        index < allMessages.length-1 &&
        allMessages[index + 1].sender.userName === message.sender.userName &&
        allMessages[index].sender.userName !== userName
    )
    return 12
    else if (
       ( index < allMessages.length-1 &&
        allMessages[index + 1].sender.userName !==  message.sender.userName &&
        allMessages[index].sender.userName !== userName )||
        (index === allMessages.length - 1 && allMessages[index].sender.userName !== userName)
    )
    return 0
    else return "auto"
}

export const isSameUser = (allMessages:Imessage[],message:Imessage,index: number)=>{
    return index > 0 && allMessages[index-1].sender.userName === message.sender.userName
}

//notification check

export const checkNotificationStatus = (notifications :string[] ,chatId :string)=>{
    return notifications.some((notify)=>notify === chatId)
}