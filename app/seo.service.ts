import {Injectable} from '@angular/core';
import { Title } from '@angular/platform-browser';

declare const document: any;

@Injectable()
export class SeoService {
    /**
     * Angular 2 Title Service
     */
    private titleService: Title;
    /**
     * <head> Element of the HTML document
     */
    private headElement: HTMLElement;
    /**
     * <meta name="description"> Element of the document head
     */
    private facebookMeta: Array<HTMLElement> = new Array<HTMLElement>();
    /**
     * <meta name="robots"> Element of the document head
     */
    private metaDescription: HTMLElement;

    private robots: HTMLElement;

    /**
     * Inject the Angular 2 Title Service
     * @param titleService
     */
    constructor(titleService: Title) {
        this.titleService = titleService;

        /**
         * get the <head> Element
         * @type {any}
         */
        this.headElement = document.querySelector('head');
        
        this.metaDescription = this.getOrCreateMetaElement('description', undefined, undefined);
        this.robots = this.getOrCreateMetaElement('robots', undefined, undefined);
    }

    public getTitle(): string {
        return this.titleService.getTitle();
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    public setMetaFacebookShare(title: string, des: string, type: string, url: string, image: string){
        this.facebookMeta.push(this.getOrCreateMetaElement('og-title', 'og:title', title));
        this.facebookMeta.push(this.getOrCreateMetaElement('og-description', 'og:description', des));
        this.facebookMeta.push(this.getOrCreateMetaElement('og-type', 'og:type', type));
        this.facebookMeta.push(this.getOrCreateMetaElement('og-url', 'og:url', url));
        this.facebookMeta.push(this.getOrCreateMetaElement('og-image', 'og:image', image));
    }

    public getMetaDescription(): string {
        return this.metaDescription.getAttribute('content');
    }

    public setMetaDescription(description: string) {
        this.metaDescription.setAttribute('content', description);
    }

    public getMetaRobots(): string {
        return this.robots.getAttribute('content');
    }

    public setMetaRobots(robots: string) {
        this.robots.setAttribute('content', robots);
    }

    /**
     * get the HTML Element when it is in the markup, or create it.
     * @param name
     * @returns {HTMLElement}
     */
    private getOrCreateMetaElement(name: string, attr: string, value: string): HTMLElement {
        let el: HTMLElement;
        el = document.querySelector('meta[name=' + name + ']');
        if (el === null) {
            el = document.createElement('meta');
            el.setAttribute('name', name);
            if(attr) el.setAttribute(attr, value);
            this.headElement.appendChild(el);
        }
        return el;
    }
}