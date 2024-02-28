import { TestBed } from '@angular/core/testing';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';


import { RegisterService } from './register.service';
import { User } from '../../model/register/user';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService]
    });
    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const mockUser: User ={ userName:'test',password:'test',email:'test@gmail.com',fullname:'testfullname'};
    //const mockResponse = {message: 'Registration sucessful'};

    service.registerS(mockUser).subscribe(response =>{
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8082/movie/register');
    expect(req.request.method).toBe('POST');
    //expect(req.request.body).toEqual(mockUser);

    req.flush({status:'success'});
  });
});
