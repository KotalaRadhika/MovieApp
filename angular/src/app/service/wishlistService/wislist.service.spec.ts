import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing'

import { WislistService } from './wislist.service';

describe('WislistService', () => {
  let service: WislistService;
  let httpMock: HttpTestingController;
 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WislistService]
    }).compileComponents();
    service = TestBed.inject(WislistService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all wishlist items', () => {
    const mockWishlist = [{ id: 1, name: 'Movie 1' }, { id: 2, name: 'Movie 2' }];
    // Set up username in sessionStorage
    sessionStorage.setItem('username', 'testUser');
    service.getAllWishlist().subscribe(wishlist => {
      expect(wishlist).toBeTruthy();
      expect(wishlist.length).toBe(2);
      expect(wishlist).toEqual(mockWishlist);
    });
    const req = httpMock.expectOne('http://localhost:8086/movie/wishlist/all/testUser');
    expect(req.request.method).toBe('GET');
    req.flush(mockWishlist);
  });
  it('should add movie to wishlist', () => {
    const rank = 'top10';
    // Set up username in sessionStorage
    sessionStorage.setItem('username', 'testUser');
    service.add(rank).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const req = httpMock.expectOne(`http://localhost:8086/movie/wishlist/add/testUser/${rank}`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Movie added to wishlist successfully' });
  });
  it('should delete movie from wishlist', () => {
    const rank = 'top10';
    // Set up username in sessionStorage
    sessionStorage.setItem('username', 'testUser');
    service.delete(rank).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const req = httpMock.expectOne(`http://localhost:8086/movie/wishlist/delete/testUser/${rank}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Movie deleted from wishlist successfully' });
  });
});

