import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';

interface ShoppingItem {
  id: number;
  name: string;
  isBought: boolean;
  quantity: number;
  price: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  items: ShoppingItem[] = [];
  nextId = 1; // To generate unique IDs for items

  constructor(private alertController: AlertController, private storage: Storage, private toastController: ToastController, private loadingController: LoadingController) {}

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Saving...',
      duration: 1000,
    });
    await loading.present();
  }

  async ngOnInit() {
    await this.storage.create();
    this.loadItems();
  }

  async loadItems() {
    this.items = (await this.storage.get('items')) || [];
    this.nextId = this.items.length > 0 ? Math.max(...this.items.map(item => item.id)) + 1 : 1;
  }

  async saveItems() {
    await this.storage.set('items', this.items);
  }

  async addItem() {
    const alert = await this.alertController.create({
      header: 'Add Item ✚',
      cssClass: 'custom-alert',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Item name',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Add',
          cssClass: 'alert-button-confirm',
          handler: (data) => {
            if (data.name) {
              this.items.push({
                id: this.nextId++,
                name: data.name,
                isBought: false,
                quantity: 1,
                price: this.formatCurrency(0), // Initialize price as "R0.00"
              });
              this.saveItems();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  markAsBought(item: ShoppingItem) {
    item.isBought = !item.isBought; // Toggle the bought status
    this.saveItems();
  }

  increaseQuantity(item: ShoppingItem) {
    item.quantity++;
    this.saveItems();
  }

  decreaseQuantity(item: ShoppingItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.saveItems();
    }
  }

  savePrice(item: ShoppingItem) {
    const numericPrice = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price;
    console.log('Price saved:', numericPrice);
    this.saveItems();
  }

  getTotalAmount(): number {
    return this.items.reduce((total, item) => {
      const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price;
      return total + price * item.quantity;
    }, 0);
  }

  getTotalQuantity(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  async clearList() {
    // Show confirmation alert
    const alert = await this.alertController.create({
      header: 'Confirm Clear List ✘',
      message: 'Are you sure you want to clear the entire shopping list?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Clear',
          cssClass: 'alert-button-confirm',
          handler: async () => {
            // Temporarily store the deleted items for undo
            const deletedItems = [...this.items];
  
            // Clear the list
            this.items = [];
            await this.saveItems();
  
            // Show undo toast
            const toast = await this.toastController.create({
              message: 'Shopping list cleared',
              duration: 5000, // 5 seconds
              position: 'bottom',
              cssClass: 'custom-toast',
              buttons: [
                {
                  text: 'Undo',
                  role: 'cancel',
                  handler: async () => {
                    // Undo the clearing
                    this.items = deletedItems;
                    await this.saveItems();
                  },
                },
              ],
            });
  
            await toast.present();
          },
        },
      ],
    });
  
    await alert.present();
  }

  async deleteItem(item: ShoppingItem) {
    // Show confirmation alert
    const alert = await this.alertController.create({
      header: 'Confirm Delete 🗑',
      message: `Are you sure you want to delete "${item.name}"?`,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancel', 
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Delete',
          cssClass: 'alert-button-confirm',
          handler: async () => {
            // Temporarily store the deleted item for undo
            const deletedItem = item;
            const deletedIndex = this.items.indexOf(item);
  
            // Remove the item from the list
            this.items = this.items.filter((i) => i.id !== item.id);
            await this.saveItems();
  
            // Show undo toast
            const toast = await this.toastController.create({
              message: `"${deletedItem.name}" deleted`,
              duration: 5000, // 5 seconds
              position: 'bottom',
              cssClass: 'custom-toast',
              buttons: [
                {
                  text: 'Undo',
                  role: 'cancel',
                  handler: async () => {
                    // Undo the deletion
                    this.items.splice(deletedIndex, 0, deletedItem);
                    await this.saveItems();
                  },
                },
              ],
            });
  
            await toast.present();
          },
        },
      ],
    });
  
    await alert.present();
  }

  formatCurrency(value: number | string): string {
    // Convert the value to a number if it's a string
    const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;

    // Format the value as currency
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(numericValue || 0); 
  }

  formatCurrencyInput(item: ShoppingItem) {
    // Format the price as currency while typing
    item.price = this.formatCurrency(item.price);
    this.saveItems();
  }
}