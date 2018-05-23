import { Component, OnChanges, OnInit } from '@angular/core';
import { ImageService } from '../image/shared/image.service';
import { LikedItemServiceService } from '../liked-item-service.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnInit {
  title = 'Gallery';
  visibleImages: Item[];

  constructor(private imageService: ImageService, public itemService: LikedItemServiceService, private modalService: NgbModal) {}

  ngOnInit() {
      this.getItems();
  }

  getItems() {
    console.log('test getItems()');
    this.imageService.getImages().subscribe(visibleImages => this.visibleImages = visibleImages);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => { });
    // this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  // });
  }

  likeItem(id, image: Object[]) {
      const likeId = 'like'.concat(id);
      const unlikeId = 'unlike'.concat(id);
      this.itemService.addLikedItem(image);
      const likeButton = document.getElementById(likeId);
      const unlikeButton = document.getElementById(unlikeId);
      likeButton.style.display = 'none';
      unlikeButton.style.display = 'inline';
     // button.ng-click = "unlikeItem(image)";
  }

  unlikeItem(id, image: Object[]) {
    const likeId = 'like'.concat(id);
    const unlikeId = 'unlike'.concat(id);
    this.itemService.removeLikedItem(image);
    const likeButton = document.getElementById(likeId);
    const unlikeButton = document.getElementById(unlikeId);
     likeButton.style.display = 'inline';
     unlikeButton.style.display = 'none';
    }
}
