import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  slides = [
    {
      title: 'STUDIO AF',
      description: '',
      image: 'https://images.unsplash.com/photo-1564754943164-e83c08469116?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D'
    },
    {
      title: 'Second Slide',
      description: '',
      image: 'https://images.unsplash.com/photo-1564754943164-e83c08469116?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D'
    },
    {
      title: 'Third Slide',
      description: '',
      image: 'https://images.unsplash.com/photo-1564754943164-e83c08469116?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D'
    }
  ];
}