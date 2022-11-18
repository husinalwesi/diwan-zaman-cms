import {ChangeDetectorRef,Component,ElementRef,EventEmitter,Input,NgZone,OnInit,Output,ViewChild} from "@angular/core";
import { MapsAPILoader } from "@agm/core";
import { environment } from "src/environments/environment";

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() latitude:any;
  @Input() longitude:any;
  @Input() address: string;
  @Input() zoom: number;
  @Input() draggable: boolean;
  @Input() isSearchByTextLocation: boolean;
  @Input() disableDefaultUI: boolean;
  @Input() readOnly: boolean;
  @Input() showDetails: boolean;
  @Output() changeLocationEmiter: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private change: ChangeDetectorRef,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,    
    ){}

  @ViewChild("search") public searchElementRef: ElementRef;

  ngAfterViewInit() {
    // google needs to use her library after view init, so the library is fully loaded..
    this.setAddressAutocomplete(this.address);
    this.bindAutoCompleteGoogleMap();
  }

  ngOnInit(): void {
    this.setDefaultIfDataNotExist();
  }

  setDefaultIfDataNotExist(){
    this.latitude = this.latitude ? this.latitude : environment.agm_latitude;
    this.longitude = this.longitude ? this.longitude : environment.agm_longitude;
    this.address = this.address ? this.address : environment.agm_address;
    this.zoom = this.zoom ? this.zoom : environment.agm_zoom;
    // 
    this.draggable = typeof this.draggable !== 'undefined' ? this.draggable : true;
    this.isSearchByTextLocation = typeof this.isSearchByTextLocation !== 'undefined' ? this.isSearchByTextLocation : true;
    this.disableDefaultUI = typeof this.disableDefaultUI !== 'undefined' ? this.disableDefaultUI : false;
    this.readOnly = typeof this.readOnly !== 'undefined' ? this.readOnly : false;
    this.showDetails = typeof this.showDetails !== 'undefined' ? this.showDetails : true;
  }

  markerDrag($event: MouseEvent) {
    this.latitude = $event["latLng"].lat();
    this.longitude = $event["latLng"].lng();
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(this.latitude, this.longitude);
    const request = {
      latLng: latlng
    };   

    geocoder.geocode(request, (results, status) => {
      this.ngZone.run(() => {
        if(results !== null && results[0] && results[0].formatted_address){
          this.address = results[0].formatted_address;
        }
      })
    });
    // 
    this.setAddressAutocomplete(this.address);
    this.emitLocation();
    // 
  }

  emitLocation(){
    this.changeLocationEmiter.emit({
        latitude: this.latitude,
        longitude: this.longitude,
        address: this.address
      });
  }

  bindAutoCompleteGoogleMap() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["address"],
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.address = place.formatted_address;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          // this.zoom = 12;
          this.change.detectChanges();
          this.emitLocation();
        });
      });
    });
  }

  setAddressAutocomplete(address) {
    if(address === undefined) return false;
    this.searchElementRef.nativeElement.value = address;
  }

}
