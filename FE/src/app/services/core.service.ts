import { Injectable, signal, effect, afterNextRender } from '@angular/core';
import { AppSettings, defaults } from '../config';
import Swiper from 'swiper';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class CoreService {
    private optionsSignal = signal<AppSettings>(defaults);
    private comments = signal([
        "“Tuyến Sài Gòn - Đà Lạt dịch vụ tốt, tài xế vui vẻ, xe sạch sẽ! ⭐⭐⭐⭐⭐”",
        "“Xe chạy êm, đặt vé nhanh chóng. Rất hài lòng! 👍”",
        "“Tài xế thân thiện, dịch vụ chuyên nghiệp. ⭐⭐⭐⭐”",
        "“Giá cả hợp lý, đặt vé tiện lợi. Chắc chắn sẽ quay lại! ❤️”",
        "“Chuyến đi thoải mái, không bị say xe. Rất tuyệt vời! 🌟”"
    ]);
    private currentCommentIndex = signal(0);
    private swiperInstance: Swiper | null = null;
    private scrollHandler: (() => void) | null = null;
    private commentInterval: any = null; 

    constructor(private router: Router) {
        // Khởi tạo lần đầu sau khi render
        afterNextRender(() => {
            this.initAllEffects();
        });

        // Lắng nghe sự kiện thay đổi route
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.cleanup(); // Dọn dẹp trước khi khởi tạo lại
                this.initAllEffects(); // Khởi tạo lại các hiệu ứng
            }
        });
    }

    getOptions() {
        return this.optionsSignal();
    }

    setOptions(options: Partial<AppSettings>) {
        this.optionsSignal.update((current) => ({
            ...current,
            ...options,
        }));
    }

    // Hàm tổng hợp để khởi tạo tất cả hiệu ứng
    public initAllEffects() {
        this.cleanup();
        this.initCommentSlider();
        this.initSwiper();
        this.initMenuToggle();
        this.initScrollEffect();
        this.initBusAnimation();
    }

    // Dọn dẹp các listener và instance cũ
    public cleanup() {
        // Dọn dẹp các hiệu ứng cũ
        if (this.swiperInstance) {
            this.swiperInstance.destroy();
            this.swiperInstance = null;
        }
    
        if (this.scrollHandler) {
            window.removeEventListener('scroll', this.scrollHandler);
            this.scrollHandler = null;
        }
    
        if (this.commentInterval) {
            clearInterval(this.commentInterval);
            this.commentInterval = null;
        }
    }

    // 1. Comment slider
    private initCommentSlider() {
        const commentContainer = document.getElementById("comment-container");
        if (!commentContainer) return;

        this.updateComment(commentContainer);

        this.commentInterval = setInterval(() => {
            this.currentCommentIndex.update(current => (current + 1) % this.comments().length);
            this.updateComment(commentContainer);
        }, 3000);
    }

    private updateComment(container: HTMLElement) {
        container.textContent = this.comments()[this.currentCommentIndex()];
        container.style.width = "auto";
    }

    // 2. Swiper blog
    private initSwiper() {
        const swiperEl = document.querySelector('.mySwiper');
        if (swiperEl) {
            this.swiperInstance = new Swiper('.mySwiper', {
                slidesPerView: 4,
                spaceBetween: 10,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
            });
        }
    }

    // 3. Menu mobile
    private initMenuToggle() {
        const menuToggle = document.getElementById("menu-toggle");
        const mobileDropdownMenu = document.getElementById("mobileDropdownMenu");

        if (menuToggle && mobileDropdownMenu) {
            menuToggle.addEventListener("click", () => {
                mobileDropdownMenu.classList.toggle("hidden");
            });
        }
    }

    // 4. Scroll effect
    private initScrollEffect() {
        const menu = document.getElementById("menu");
        const main = document.querySelector("main");

        if (!menu || !main) return;

        menu.classList.remove("bg-transparent");
        menu.classList.add("bg-[#043175]");

        if (main.id === "home" || main.id === "busDetail") {
            this.scrollHandler = () => {
                if (window.scrollY > 50) {
                    menu.classList.remove("bg-transparent");
                    menu.classList.add("bg-[#043175]");
                } else {
                    menu.classList.remove("bg-[#043175]");
                    menu.classList.add("bg-transparent");
                }
            };

            this.scrollHandler();
            window.addEventListener("scroll", this.scrollHandler);
        }
    }

    // 5. Bus animation
    private initBusAnimation() {
        const bus = document.getElementById("bus");
        if (!bus) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bus.classList.add("bus-move");
                }
            });
        }, { threshold: 0.5 });

        observer.observe(bus);
    }

    // 6. Cancel modal
    openCancelModal() {
        document.getElementById("cancelModal")?.classList.remove("hidden");
    }

    closeCancelModal() {
        document.getElementById("cancelModal")?.classList.add("hidden");
    }

    toggleTextarea(show: boolean) {
        const otherTextarea = document.getElementById("otherReason");
        if (!otherTextarea) return;

        if (show) {
            otherTextarea.classList.remove("hidden");
        } else {
            otherTextarea.classList.add("hidden");
        }
    }

}