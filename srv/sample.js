// before the action happens
this.before('READ', Books, async (req) => {} );

// during action happens
this.on('READ', Books, async (req,next) => {
    return next();
});

// after the action happened
this.onafterprint('READ', Books, async (books,req)=> {});
