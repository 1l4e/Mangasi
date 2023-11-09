function logger(message:any) {
    if (process.env.NODE_ENV === 'development') {
      logger(message);
    }
  }
  
export default logger