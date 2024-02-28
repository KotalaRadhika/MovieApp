import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from '@angular/forms';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../service/movieService/movie.service';
import { WislistService } from '../../service/wishlistService/wislist.service';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let mockMovieService: jasmine.SpyObj<MovieService>;
  let mockWishlistService: jasmine.SpyObj<WislistService>;
  beforeEach(async () => {
    mockMovieService = jasmine.createSpyObj('MovieService', ['getByRank']);
    mockWishlistService = jasmine.createSpyObj('WishlistService', ['add']);
    await TestBed.configureTestingModule({
      imports: [MovieListComponent,HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: WislistService, useValue: mockWishlistService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the MovieListComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch movie details by rank input', () => {
    const mockMovieResponse = { id: '1', title: 'Movie 1', rank: 1,description:'movie description', image:'image',big_image:'big_image',
    genre:['genre1', 'genre2'],thumbnail:'thumbnail',rating:'rating',year:'2000',imdbid:'imdbid',imdb_link:'imdb_link' };
    
    component.rankInput = 'top5';
    mockMovieService.getByRank.and.returnValue(of(mockMovieResponse));
    spyOn(console, 'log');
    component.getById();
    expect(component.movieById).toEqual(mockMovieResponse);
  });
 
  it('should add movie to wishlist when user is logged in', () => {
    spyOn(window.sessionStorage, 'getItem').and.returnValue('true');
    const mockMovieResponse = { id: '1', title: 'Movie 1', rank: 1,description:'movie description', image:'image',big_image:'big_image',
    genre:['genre1', 'genre2'],thumbnail:'thumbnail',rating:'rating',year:'2000',imdbid:'imdbid',imdb_link:'imdb_link' };
    mockWishlistService.add.and.returnValue(of({}));
    spyOn(Swal, 'fire');
    component.addToWishlist(mockMovieResponse);
    expect(mockWishlistService.add).toHaveBeenCalledWith(mockMovieResponse.id);
   
  });
  
  it('should render input field and search button', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[type="search"]')).toBeTruthy();
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
  });
});