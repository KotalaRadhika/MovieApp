import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { TopmoviesComponent } from './topmovies.component';
import { MovieResponse } from '../../model/movieResponse/movie-response';
import { MovieService } from '../../service/movieService/movie.service';
import { WislistService } from '../../service/wishlistService/wislist.service';
import Swal from 'sweetalert2';
describe('TopmoviesComponent', () => {
  let component: TopmoviesComponent;
  let fixture: ComponentFixture<TopmoviesComponent>;
  let movieService: MovieService;
  let wishlistService: WislistService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopmoviesComponent,HttpClientTestingModule, RouterTestingModule],
      providers: [MovieService, WislistService]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(TopmoviesComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
    wishlistService = TestBed.inject(WislistService);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should populate content on initialization', () => {
    const mockData: MovieResponse[] = [
      { id: '1', title: 'Movie 1', rank: 1,description:'movie description', image:'image',big_image:'big_image',
    genre:['genre1', 'genre2'],thumbnail:'thumbnail',rating:'rating',year:'2000',imdbid:'imdbid',imdb_link:'imdb_link' },
      { id: '2', title: 'Movie 2',rank: 1,description:'movie description', image:'image',big_image:'big_image',
      genre:['genre1', 'genre2'],thumbnail:'thumbnail',rating:'rating',year:'2000',imdbid:'imdbid',imdb_link:'imdb_link' }
    ];
    spyOn(movieService, 'getTop100').and.returnValue(of(mockData));
    component.ngOnInit();
    expect(component.content).toEqual(mockData);
  });
  it('should add movie to wishlist if user is logged in', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('true');
    spyOn(wishlistService, 'add').and.returnValue(of({}));
    spyOn(Swal, 'fire');
    const mockMovie: MovieResponse = { id: '1', title: 'Movie 1', rank: 1,description:'movie description', image:'image',big_image:'big_image',
    genre:['genre1', 'genre2'],thumbnail:'thumbnail',rating:'rating',year:'2000',imdbid:'imdbid',imdb_link:'imdb_link' };
    
    component.addToWishlist(mockMovie);
    expect(wishlistService.add).toHaveBeenCalledWith(mockMovie.id);
    
  });
  it('should redirect to login if user is not logged in', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    spyOn(component['router'], 'navigate');
    spyOn(Swal, 'fire');
    const mockMovie: MovieResponse = { id: '1', title: 'Movie 1', rank: 1,description:'movie description', image:'image',big_image:'big_image',
    genre:['genre1', 'genre2'],thumbnail:'thumbnail',rating:'rating',year:'2000',imdbid:'imdbid',imdb_link:'imdb_link' };
    
    component.addToWishlist(mockMovie);
    expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
    
  });
  it('should handle error while loading top 100 movies', () => {
    const mockError = 'Test error message';
    spyOn(movieService, 'getTop100').and.returnValue(throwError(mockError));
    spyOn(console, 'error');
    component.ngOnInit();
    expect(console.error).toHaveBeenCalledWith('Error loading top 100 movies : ', mockError);
  });
});