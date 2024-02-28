import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    }).compileComponents();
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should fetch top 100 movies', () => {
    const mockTop100 = [{ id: 1, name: 'Movie 1' }, { id: 2, name: 'Movie 2' }];
    service.getTop100().subscribe(movies => {
      expect(movies).toBeTruthy();
      expect(movies.length).toBe(2);
      expect(movies).toEqual(mockTop100);
    });
    const req = httpMock.expectOne('http://localhost:8084/movie/getTop100');
    expect(req.request.method).toBe('GET');
    req.flush(mockTop100);
  });
  it('should fetch movie by rank', () => {
    const rank = 'top10';
    const mockMovie = { id: 1, name: 'Movie 1' };
    service.getByRank(rank).subscribe(movie => {
      expect(movie).toBeTruthy();
      expect(movie).toEqual(mockMovie);
    });
    const req = httpMock.expectOne(`http://localhost:8084/movie/getMovieById/${rank}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovie);
  });
});
