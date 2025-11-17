# Showcase JavaScript Data API (v10)

The Showcase Data API provides a simple key-value storage layer inside the Showcase app. Values persist locally on the device until the Showcase app is uninstalled or reinstalled. Any stored key can be pushed to the remote Showcase server for retrieval via the [REST API](../rest-api/README.md).

The key-value model allows for maximum flexibility - anything serializable to a string can be stored and retrieved from device memory.

---

## Requirements

Before using the API, you must include the following in your HTML file:

### 1. jQuery v2.1.1

Required for compatibility with Showcase interactive elements.

```html
<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
```

### 2. Latest showcase-data.js (current version: 10)

Older versions are missing essential API methods.

```html
<script src="showcase-data.js"></script>
```

### 3. Script Loading Rules

Scripts must either:
- Use the `defer` attribute, **OR**
- Be placed at the bottom of the `<body>`, directly before `</body>`

This ensures proper load order and DOM availability.

---

## Setup

### Option 1: Using `defer` (recommended)

```html
<script src="https://code.jquery.com/jquery-2.1.1.min.js" defer></script>
<script src="showcase-data.js?v=10" defer></script>

<script defer>
    var sc_data = SHOWCASE_DATA({
        testMode: location.hostname === "localhost"
    });
</script>
```

### Option 2: Scripts at Bottom of `<body>`

```html
<!-- Page content -->

<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="showcase-data.js?v=10"></script>

<script>
    var sc_data = SHOWCASE_DATA({
        testMode: location.hostname === "localhost"
    });
</script>
</body>
```

---

## API Methods

### Storing a Value

Save or "put" a key-value pair to local device memory:

```javascript
var formData = { first_name: "Totoro", last_name: "Ghibli" };

sc_data.put("current_form_data", JSON.stringify(formData));
```

### Retrieving a Value

You must register a callback before calling `get()`:

```javascript
// Register a global function for handling returned values
sc_data.global_get_callback(function(key, value) {
    console.log("Got:", key, value);
    
    if (value) {
        var obj = JSON.parse(value);
        console.log("Parsed:", obj);
    }
});

sc_data.get("current_form_data");
```

### Saving a Key to the Remote Showcase Server

Snapshot and store data remotely:

```javascript
// Create a unique snapshot key
var snapshotKey = "form_data_" + Date.now();

// Save locally
sc_data.put(snapshotKey, JSON.stringify(formData));

// Store remotely
sc_data.store(snapshotKey);
```

### Get Email of Logged-in Showcase User

```javascript
sc_data.email_get_callback(function(email) {
    console.log("User email:", email);
});

sc_data.getEmail();
```

---

## Showcase Controls & Navigation

### Hide Showcase Controls

Hide the Showcase controls (Back Button and Tray Slider):

```javascript
sc_data.hideControls();
```

### Show Showcase Controls

Show the Showcase controls (Back Button and Tray Slider):

```javascript
sc_data.showControls();
```

### Navigate Back

Navigate back to the previous Showcase screen:

```javascript
sc_data.back();
```

### Navigate to Home

Navigate to the portfolio listing screen (home):

```javascript
sc_data.home();
```

### Trigger Share

Navigate to the portfolio listing screen (share):

```javascript
sc_data.share();
```

---

## Example: Ranking UI With v10 API

A practical example showing ranking, comments, and submitting with unique GUIDs.

```javascript
// GUID generator
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return (
        s4() + s4() + "-" +
        s4() + "-" +
        s4() + "-" +
        s4() + "-" +
        s4() + s4() + s4()
    );
}

// Gather results
function getRankedData() {
    var slots = document.querySelectorAll(".slot");
    var ranked = [];

    slots.forEach(function(slot, index) {
        if (slot.children.length) {
            ranked.push({
                rank: index + 1,
                item: slot.firstElementChild.textContent.trim(),
                itemId: slot.firstElementChild.id
            });
        }
    });

    var comments = document.querySelector('input[data-field-name="comments"]').value || "";

    return { ranked: ranked, comments: comments };
}

// Submit data to Showcase
function handleSubmit(e) {
    e.preventDefault();

    var btn = e.target.closest(".btn.submit, #submitButton");
    if (btn) {
        btn.textContent = "Submitting...";
        btn.disabled = true;
    }

    var data = getRankedData();
    var key = guid();

    sc_data.put(key, JSON.stringify(data));
    sc_data.store(key);

    setTimeout(function() {
        var modal = document.getElementById("thanksModal");
        if (modal) {
            modal.style.display = "flex";
            modal.setAttribute("tabindex", "-1");
            modal.focus();
        }
    }, 600);
}
```

---

## Packaging Your Example (ZIP)

Showcase required the package to be *.html.zip

Zip files will just be loaded into the Showcase as downloadable files.

### On macOS / Linux:

For the simple example:

```bash
cd javascript-api/simple-example
zip -r ../simple-example.html.zip *
```

For the quotes example:

```bash
cd javascript-api/quotes
zip -r ../quotes.html.zip *
```

---

## Version Note

To avoid bugs, missing methods, or inconsistent behaviour:

**Always use the latest showcase-data.js file (version 10).**

---

## Additional Resources

See `simple-example/index.html` for a more practical example.

For retrieving stored data, refer to the [REST API documentation](../rest-api/README.md).
