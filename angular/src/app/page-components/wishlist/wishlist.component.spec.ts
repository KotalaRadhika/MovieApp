import { ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { WislistService } from '../../service/wishlistService/wislist.service';
import { of, throwError } from 'rxjs';
import { WishlistComponent } from './wishlist.component';
import { MovieResponse } from '../../model/movieResponse/movie-response';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;
  let wishlistService: WislistService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistComponent,HttpClientTestingModule,RouterTestingModule],
      providers: [WislistService]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    wishlistService = TestBed.inject(WislistService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch wishlist items on initialization', () => {
   
    const mockWishlist: MovieResponse[] = [
      { id: '1', title: 'Movie 1', rank: 1,description:'movie description', image:'image',big_image:'big_image',
    genre:['genre1', 'genre2'],thumbnail:'thumbnail',rating:'rating',year:'2000',imdbid:'imdbid',imdb_link:'imdb_link' },
      { id: '2', title: 'Movie 2',rank: 1,description:'movie description', image:'image',big_image:'big_image',
      genre:['genre1', 'genre2'],thumbnail:'thumbnail',rating:'rating',year:'2000',imdbid:'imdbid',imdb_link:'imdb_link' }
    ];
    spyOn(wishlistService, 'getAllWishlist').and.returnValue(of(mockWishlist));
    component.ngOnInit();
    expect(wishlistService.getAllWishlist).toHaveBeenCalled();
    expect(component.content).toEqual(mockWishlist);
  });
  
  it('should handle error when fetching wishlist items on initialization', () => {
    spyOn(wishlistService, 'getAllWishlist').and.returnValue(throwError('Error'));
    spyOn(window, 'confirm').and.returnValue(true); // Mock user confirmation
    //spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true)); // Mock router navigate
    component.ngOnInit();
    expect(wishlistService.getAllWishlist).toHaveBeenCalled();
    //expect(component.router.navigate).toHaveBeenCalledWith(['/topmovies']);
  });
  // it('should delete movie from wishlist', () => {
  //   const movieId = '1';
  //   spyOn(wishlistService, 'delete').and.returnValue(of(null));
  //   spyOn(window, 'confirm').and.returnValue(true); // Mock user confirmation
  //   component.deleteFromWishlist(movieId);
  //   expect(wishlistService.delete).toHaveBeenCalledWith(movieId);
    
  // });
  // it('should handle error when deleting movie from wishlist', () => {
  //   const movieId = '1';
  //   spyOn(wishlistService, 'delete').and.returnValue(throwError('Error'));
  //   spyOn(window, 'confirm').and.returnValue(true); // Mock user confirmation
  //   component.deleteFromWishlist(movieId);
  //   expect(wishlistService.delete).toHaveBeenCalledWith(movieId);
    
  // });
});
