import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from 'src/app/services/data.service';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { ICoin } from '../../models/ICoin';
import { ListCryptoComponent } from './list-crypto.component';

describe('ListCryptoComponent', () => {
  let component: ListCryptoComponent;
  let fixture: ComponentFixture<ListCryptoComponent>;
  let http: HttpTestingController;
  let testService: FirebaseApiService;
  let dataService: DataService;

  let firebaseURL = "https://cors.bridged.cc/https://us-central1-cryptoapp-1ffe9.cloudfunctions.net";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCryptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    TestBed.configureTestingModule({});
    testService = TestBed.inject(FirebaseApiService);
    dataService = TestBed.inject(DataService);
  });

  it('should create', () => {
    expect(testService).toBeTruthy();
  });

  it('Should return an observable coin', () => {
    const testWatchlist = 
    {
      symbol: 'LKC',
      id: 'lukecoin',
      userEmail: 'test@mail.itsligo.ie'
    }

    dataService.getWatchlists().subscribe(coin => {
      expect(coin).toEqual(coin);
    });

    const request = http.expectOne(firebaseURL + "/getWatchlists");
    expect(request.request.method).toBe("GET");
    request.flush(testWatchlist);

  })
});
