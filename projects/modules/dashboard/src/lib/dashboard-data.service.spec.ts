import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { DataService } from './dashboard-data.service';
import { take } from "rxjs/operators";
import { Chance } from 'chance';
const chance = new Chance();

describe('DataService', () => {
  let service: DataService;
  let backend: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ DataService ]
  }));

  beforeEach(inject([HttpTestingController, DataService], (mockBackend, s: DataService) => {
    service = s;
    backend = mockBackend;
  }));

  describe('Scenario: setServerUrl', () => {
    it('should have a setServerUrl function', () => {
      expect(service.setServerUrl).toBeDefined();
      expect(typeof service.setServerUrl === 'function').toBe(true);
    });

    it('should set serverUrl', () => {
      const url = chance.url();
      service.setServerUrl(url);
      expect(service['serverUrl']).toEqual(url);
    });
  });

  describe('Scenario: getData', () => {
    it('should have a getData function', () => {
      expect(service.getData).toBeDefined();
      expect(typeof service.getData === 'function').toBe(true);
    });

    it('should send the correct GET request', async(() => {
      const dataSource = chance.string();
      const url = chance.url();
      service.setServerUrl(url);
      service.getData(dataSource)
        .pipe(take(1))
        .subscribe(data => {});
      const call = backend.expectOne(`${url}/dataSets/${dataSource}`);
      expect(call.request.method).toEqual('GET');
      backend.verify();
    }));
  });

  describe('Scenario: createData', () => {
    it('should have a createData function', () => {
      expect(service.createData).toBeDefined();
      expect(typeof service.createData === 'function').toBe(true);
    });

    it('should send the correct POST request', async(() => {
      const dataSource = chance.string();
      const url = chance.url();
      const body = {
        "test": "test"
      };
      service.setServerUrl(url);
      service.createData(dataSource, body)
        .pipe(take(1))
        .subscribe(data => {});
      const call = backend.expectOne(`${url}/dataSets/${dataSource}`);
      expect(call.request.method).toEqual('POST');
      expect(call.request.body).toEqual({
        "id": dataSource,
        "data": body
      });
      backend.verify();
    }));
  });

  describe('Scenario: updateData', () => {
    it('should have a updateData function', () => {
      expect(service.updateData).toBeDefined();
      expect(typeof service.updateData === 'function').toBe(true);
    });

    it('should send the correct PUT request', async(() => {
      const dataSource = chance.string();
      const url = chance.url();
      const body = {
        "test": "test"
      };
      service.setServerUrl(url);
      service.updateData(dataSource, body)
        .pipe(take(1))
        .subscribe(data => {});
      const call = backend.expectOne(`${url}/dataSets/${dataSource}`);
      expect(call.request.method).toEqual('PUT');
      expect(call.request.body).toEqual({
        "id": dataSource,
        "data": body
      });
      backend.verify();
    }));
  });

  describe('Scenario: deleteData', () => {
    it('should have a deleteData function', () => {
      expect(service.deleteData).toBeDefined();
      expect(typeof service.deleteData === 'function').toBe(true);
    });

    it('should send the correct DELETE request', async(() => {
      const dataSource = chance.string();
      const url = chance.url();
      service.setServerUrl(url);
      service.deleteData(dataSource)
        .pipe(take(1))
        .subscribe(c => {});
      const call = backend.expectOne(`${url}/dataSets/${dataSource}`);
      expect(call.request.method).toEqual('DELETE');
      backend.verify();
    }));
  });
});
