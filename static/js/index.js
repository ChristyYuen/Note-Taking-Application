// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};

// Given an empty app object, initializes it filling its attributes,
// creates a Vue instance, and then initializes the Vue instance.
let init = (app) => {

    // This is the Vue data.
    app.data = {
        posts: [], // See initialization.
        user_email: user_email,
    };

    app.index = (a) => {
        // Adds to the posts all the fields on which the UI relies.
        let i = 0;
        for (let p of a) {
            p._idx = i++;
            // TODO: Only make the user's own posts editable.
            p.editable = (p.email === user_email);                                                  //CHANGED
            p.edit = false;
            p.is_pending = false;
            p.error = false;
            p.original_content = p.content; // Content before an edit.
            p.server_content = p.content; // Content on the server.
            p.original_title = p.title;
            p.server_title = p.title; 
        }
        return a;
    };

    app.reindex = () => {
        // Adds to the posts all the fields on which the UI relies.
        let i = 0;
        for (let p of app.vue.posts) {
            p._idx = i++;
        }
    };

    app.do_edit = (post_idx) => {
        let p = app.vue.posts[post_idx];
        p.edit = (p.email === user_email);
        p.is_pending = false;
        
    };

    app.do_cancel = (post_idx) => {
        let p = app.vue.posts[post_idx];
        if (p.id === null) {
            app.vue.posts.splice(post_idx, 1);                                            //ADDED                                                                //ADDED
        } else {
            p.edit = false;
            p.is_pending = false;
            p.content = p.original_content;
            p.title= p.original_title;
        }
    }

    app.do_save = (post_idx) => {
        // Handler for "Save edit" button.
        let p = app.vue.posts[post_idx];
        console.log(p.content)
        console.log(p.title)
        if (p.content !== p.server_content && p.title !== p.server_title) {
            p.is_pending = true;
            axios.post(posts_url, {
                content: p.content,
                id: p.id,
                title: p.title,
            }).then((result) => {
                console.log("Received:", result.data);
                    app.vue.posts.splice(post_idx, 1);

                    let q = 
                    { 
                        id: result.data.id,
                        edit: false,
                        editable: (p.email === user_email),
                        content: result.data.content,
                        server_content: result.data.content,
                        original_content: "",
                        author: author_name,
                        email: user_email,
                        title: result.data.title,
                        server_title: result.data.title,
                        original_title: "",

                    };
                    app.data.posts.splice(post_idx, 0, q)
                    app.reindex(app.vue.posts)              

            }).catch((error) => {
                //p.is_pending = false;
                console.log("Caught error");
                console.log(error);
                // We stay in edit mode.
            });
        } else {
            // No need to save.
            p.edit = false;
            p.original_content = p.content;
            p.original_title = p.title; 
        }
    }

    app.add_post = () => {
        // TODO: this is the new post we are inserting.
        // You need to initialize it properly, completing below, and ...
        let q = {                                           //ADDED
            id: null,
            edit: true,                                                                   //CHANGED
            editable: true,                                                               //CHANGED
            content: "",
            server_content: null,
            original_content: "",
            author: null,
            email: null,
            is_reply: null,
            title: "",
            server_title: null,
            original_title: "",
            //is_pending: false,
        };
        // TODO:
        // ... you need to insert it at the top of the post list.
        console.log("Added Post")
        app.data.posts.unshift(q) //adds post to the top of list
        app.reindex(app.data.posts);
    };

    // app.reply = (post_idx) => {
    //     //console.log("Replying") //It's working c:
    //     let p = app.vue.posts[post_idx];
    //     if (p.id !== null) {
    //         // TODO: this is the new reply.  You need to initialize it properly...
    //         let q = {
    //             id: null,
    //             edit: true,
    //             editable: (p.email === user_email),
    //             content: "",
    //             server_content: null,
    //             original_content: "",
    //             author: null,
    //             email: null,
    //             is_reply: p.id,
    //         };
    //         // TODO: and you need to insert it in the right place, and reindex
    //         // the posts.  Look at the code for app.add_post; it is similar.
    //         app.data.posts.splice(post_idx + 1, 0, q)
    //         app.reindex(app.data.posts)
    //     }

    // };

    data: {
          activeColor: 'blue'
    }

    app.do_delete = (post_idx) => {
        let p = app.vue.posts[post_idx];
        if (p.id == null) {
            app.do_cancel(post_idx)

        } else {

        axios.post(delete_url, {id: p.id}).then(() => {

            app.vue.posts.splice(post_idx, 1);
            app.reindex(app.vue.posts);
        })

        }
    };


    // We form the dictionary of all methods, so we can assign them
    // to the Vue app in a single blow.
    app.methods = {
        do_edit: app.do_edit,
        do_cancel: app.do_cancel,
        do_save: app.do_save,
        add_post: app.add_post,
        // reply: app.reply,
        do_delete: app.do_delete,
    };

    // This creates the Vue instance.
    app.vue = new Vue({
        el: "#vue-target",
        data: app.data,
        methods: app.methods
    });

    // And this initializes it.
    app.init = () => {
        axios.get(posts_url).then((result) => {
            console.log("Received:", result.data);
            //posts = result.data.posts.reverse()
            posts = result.data.posts
            posts = app.index(posts)
            console.log(posts)
            app.vue.posts = app.index(posts);
            }).catch((error) => {
                //p.is_pending = false;
                console.log("Printing error");
                console.log(error)
            });
    };

    // Call to the initializer.
    app.init();
};

// This takes the (empty) app object, and initializes it,
// putting all the code i
init(app);
