  // Animation variants
 export const containerVariants:any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  export const itemVariants:any = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Background shapes animation - fixed positions
  export const shapeVariants:any = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 0.2,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  

  // Fixed background shapes data
  export const backgroundShapes:any = [
    { width: "25rem", height: "25rem", left: "10%", top: "15%", opacity: 0.12 },
    { width: "30rem", height: "30rem", left: "75%", top: "20%", opacity: 0.15 },
    { width: "20rem", height: "20rem", left: "20%", top: "75%", opacity: 0.14 },
    { width: "35rem", height: "35rem", left: "65%", top: "70%", opacity: 0.16 },
    { width: "15rem", height: "15rem", left: "50%", top: "40%", opacity: 0.18 }
  ];