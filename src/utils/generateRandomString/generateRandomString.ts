const generateRandomString = (length: number = 12) => {
	let text = "";
  
  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  
  for (let i = 0; i < length; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  
  return text;
};

export default generateRandomString;
