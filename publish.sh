cp -r ./dist ../
cp -r ./dist ./release/0.0.2

<script src="https://www.gstatic.com/firebasejs/4.0.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDsTymfb1C7ap2OrSciTv7aooLNgZU1j9U",
    authDomain: "portfoliomanager-9d2c9.firebaseapp.com",
    databaseURL: "https://portfoliomanager-9d2c9.firebaseio.com",
    projectId: "portfoliomanager-9d2c9",
    storageBucket: "portfoliomanager-9d2c9.appspot.com",
    messagingSenderId: "419411609008"
  };
  firebase.initializeApp(config);
</script>