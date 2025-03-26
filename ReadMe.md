# 🛒 Shopping List App
A modern, user-friendly shopping list application built with Ionic Angular that helps you plan and organize your shopping trips efficiently. The app stores your shopping list locally, so your data persists between sessions.

## ✨ Features
- **Add items** to your shopping list with names, quantities, and prices
- **Track total cost** of your shopping list automatically
- **Adjust quantities** with intuitive + and - buttons
- **Mark items as bought** with checkboxes
- **Swipe to** edit prices or delete items
- **Clear your list** when shopping is complete
- **Works offline** - all data is stored locally

## 🚀 Getting Started
### Prerequisites
- Ionic CLI (npm install -g @ionic/cli)
- Angular CLI (npm install -g @angular/cli)

### Installation
1. Clone the repository:

    ```bash
    git clone https://github.com/mncedisiHlonzi/shopping-list-app.git
    cd shopping-list-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    ionic serve
    ```

4. For Android/iOS builds:

    ```bash
    ionic cap add android
    ionic cap add ios
    ionic cap open android/ios
    ```

## 🛠️ Built With
- **Ionic Framework** - Cross-platform mobile app development
- **Angular** - Frontend framework
- **Capacitor** - Native runtime
- **Local Storage** - Data persistence

## 📝 Usage Guide

1. **Adding Items:**
- Tap the "+" button to add new items
- Enter item name and confirm

2. **Managing Quantities:**
- Use the + and - buttons to adjust quantities
- Minimum quantity is 1

3. **Price Management:**
- Swipe left on an item to edit its price
- Prices are automatically formatted as currency (R)

4. **Marking as Bought:**
- Check the checkbox to mark items as purchased
- Bought items appear with strikethrough

5. **Deleting Items:**
- Swipe left fully to reveal delete option
- Tap trash icon to remove item

6. **Clearing List:**
- Use the "Clear" button in header to reset your list

## 🌟 Why This App?
- **Simple yet powerful** - All essential shopping list features without complexity
- **Offline-first** - Works without internet connection
- **Cost tracking** - Know exactly how much you'll spend before checkout
- **Customizable** - Adjust quantities and prices easily

## License
- This project is open-source and available under the **MIT License**.

**Happy Shopping! 🛍️**