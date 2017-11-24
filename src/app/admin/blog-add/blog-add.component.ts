import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogAdminService } from '../services/blog-admin.service';
import { Blog } from '../model/blog.model';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {

  public imgTitle: string;
  public imgSrc: string;
  public postTitle: string;
  public content: string;
  public post: Blog;

  constructor(private blogService: BlogAdminService, private router: Router) { }

  ngOnInit() {
  }

  fileLoad($event: any) {
    const myReader: FileReader = new FileReader();
    const file: File = $event.target.files[0];
    if (file) {
      this.imgTitle = file.name;
      myReader.readAsDataURL(file);

      myReader.onload = (e: any) => {
        this.imgSrc = e.target.result;
      };
    }
  }

  createPost() {
    if (this.imgSrc) {
      this.post = new Blog(
        this.postTitle,
        this.content,
        this.imgTitle,
        this.imgSrc.substring(23)
      );
      this.blogService.createPost(this.post);
      alert(`${this.postTitle} added to posts`);
      this.router.navigate(['/admin']);
    }
  }

  cancel() {
    this.router.navigate(['/admin']);
  }
}
